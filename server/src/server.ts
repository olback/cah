import express from 'express';
import socketio from 'socket.io';
import { env } from 'process';
import { Game, Games } from './game';
import { Player, Players } from './player';
import { Client } from 'pg';
import { dbConf } from './config';
import * as path from 'path';
// @ts-ignore
import * as git from 'git-rev-sync';

const port = env.NODE_PORT ? Number(env.NODE_PORT) : 5000;
const app = express();

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = socketio(server, {
    origins: env.NODE_ENV === 'production' ? ['cah.ninja:443'] : ['*:*']
});

const games: Games = {};
const players: Players = {};

io.on('connection', socket => {

    // console.log(`New socket: ${socket.id}`);

    socket.on('login', (id: string) => {

        if (players[id]) {
            players[id].socket = socket;
            // console.log(`Updating socket for player ${id}.`);
        } else {
            players[String(id)] = new Player(id, socket);
            // console.log(`Player ${id} joined the game.`);
        }

    });

    socket.on('username', (data: Socket.UsernameUpdate) => {

        const { pid, username } = data;
        if (players[pid]) {
            players[pid].username = username;
        }
        // console.log(`Player ${pid} changed username to ${username ? username : '<none>'}.`);

    });

    socket.on('get-packs-list', async () => {

        const db = new Client(dbConf);
        await db.connect();
        const dbres = await db.query('select distinct pack from white union select pack from black');

        const packs: Pack[] = [];

        for (const p of dbres.rows) {

            const b = await db.query('select count(*) from black where pack=$1', [p.pack]);
            const c = await db.query('select count(*) from white where pack=$1', [p.pack]);

            packs.push({
                pack: p.pack,
                black: Number(b.rows[0].count),
                white: Number(c.rows[0].count)
            });

        }

        db.end();

        socket.emit('get-packs-list', packs.sort((a,b) => (a.pack > b.pack) ? 1 : ((b.pack > a.pack) ? -1 : 0)));

    });

    socket.on('acronym', async () => {

        const db = new Client(dbConf);
        await db.connect();
        const dbres = await db.query('select text from acronyms offset floor(random() * (select count(*) from acronyms)) limit 1');
        db.end();

        socket.emit('acronym', dbres.rows[0].text);

    });

    socket.on('new-game', (data: Socket.NewGame) => {
        if(data.pid && data.gid && players[data.pid] && !players[data.pid].inGame) {
            games[data.gid] = new Game(
                data.gid,
                players[data.pid],
                data.packs,
                data.password,
                data.maxScore,
                data.maxPlayers,
                data.timeout,
                data.blanks
            );
        } else {
            socket.emit('error-message', {
                message: 'Error creating game.'
            });
        }
    });

    socket.on('join-game', (data: Socket.JoinGameRequest) => {
        if (games[data.gid] && players[data.pid] && !players[data.pid].inGame && games[data.gid].players.amount() < games[data.gid].maxPlayers) {
            if (games[data.gid].password.check(data.password) && players[data.pid].username) {
                games[data.gid].players.add(players[data.pid]);
                socket.emit('redirect', ['game', data.gid]);
            } else if (!players[data.pid].username) {
                socket.emit('error-message', {
                    message: 'You may not enter a game without a username.'
                });
            } else {
                socket.emit('error-message', {
                    message: 'Incorrect password.'
                });
            }
        } else {
            socket.emit('error-message', {
                message: `Error joining game with ID "${data.gid}".`
            });
        }
    });

    socket.on('game', (data: Socket.GameRequest) => {

        if (games[data.gid]) {

            if (games[data.gid].players.check(data.pid)) {

                socket.emit('game', games[data.gid].getState(data.pid));

            } else {

                socket.emit('error-message', {
                    message: `Player ${data.pid} is not a member of game ${data.gid}.`
                });
                socket.emit('redirect', ['/join', data.gid]);

            }

        } else {

            socket.emit('error-message', {
                message: `Game with ID ${data.gid} does not exist.`
            });
            socket.emit('redirect', ['/']);

        }

    });

    socket.on('pick-white', (data: Socket.PickWhite) => {

        if (games[data.gid]) {

            if (games[data.gid].players.check(data.pid)) {

                if (games[data.gid].pickWhite(data.pid, data.card)) {
                    socket.emit('game', games[data.gid].getState(data.pid));
                } else {
                    socket.emit('error-message', {
                        message: 'Error selecting card'
                    });
                }

            } else {

                socket.emit('error-message', {
                    message: `Player ${data.pid} is not a member of game`
                });

            }

        } else {

            socket.emit('error-message', {
                message: `Game ${data.gid} does not exist`
            });

        }

    });

    socket.on('blank-card', (data: Socket.CustomWhite) => {

        if (games[data.gid] && players[data.pid]) {

            if (games[data.gid].players.check(data.pid)) {

                if (!games[data.gid].blankPick(data)) {
                    socket.emit('error-message', {
                        message: 'Error playing blank card'
                    });
                }

            } else {

                socket.emit('error-message', {
                    message: `Player ${data.pid} is not a member of game`
                });

            }

        } else {

            socket.emit('error-message', {
                message: 'Error playing card'
            });

        }

    });

    socket.on('pick-winner', (data: Socket.PickWinner) => {

        if (data.pid && games[data.gid] && data.winner) {
            games[data.gid].pickWinner(data.winner);
        } else {
            socket.emit('error-message', {
                message: 'Error selecting winner'
            });
        }

    });

    socket.on('leave-game', (data: Socket.GameRequest) => {
        if (data.pid && data.gid && games[data.gid]) {
            if (games[data.gid].players.check(data.pid)) {
                games[data.gid].players.remove(players[data.pid]);
                if (!games[data.gid].players.amount()) {
                    delete games[data.gid];
                }
            }
        } /* else {
            socket.emit('error-message', {
                message: `Error leaving game with ID "${data.gid}"`
            });
        } */
    });

    socket.on('error', e => {
        console.error(e);
    });

    socket.on('disconnect', () => {

        for(const p in players) {

            if (players[p].socket.id === socket.id) {

                // console.log(`Player ${players[p].id} has left the game.`);

                for (const g in games) {
                    if (games[g].players.check(players[p].id)) {
                        games[g].players.remove(players[p]);
                        if (!games[g].players.amount()) {
                            delete games[g];
                        }
                    }
                }

                delete players[p];

            }

        }

    });

    socket.on('info', () => {
        socket.emit('info', {
            players: Object.keys(players).length,
            games: Object.keys(games).length,
            version: git.short()
        });
    });


});

if (env.NODE_ENV === 'dev') {
    app.get('/i', (_req, res) => {
        res.json({
            players: Object.keys(players).length,
            games: Object.keys(games).length,
            version: git.short()
        });
    });
}

app.use(express.static(path.join(process.cwd(), '..', 'client', 'dist')));

app.get('**', async (_req, res) => {

    res.sendFile(path.join(process.cwd(), '..', 'client', 'dist', 'index.html'));

});

// Remove games older than 12 hours. // Not needed since games get removed when there are no players left.
// setInterval(() => {

//     for (const game in games) {

//         if(new Date().getTime() - games[game].created > 12 * 3600 * 1000) {
//             delete games[game];
//         }

//     }

// }, 1000 * 1800);

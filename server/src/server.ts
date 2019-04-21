import express from 'express';
import socketio from 'socket.io';
import { env } from 'process';
import { Game, Games } from './game';
import { Player, Players } from './player';
import { Client } from 'pg';
import { dbConf } from './config';
import * as path from 'path';
// import './data.d.ts';

const port = env.PORT ? Number(env.PORT) : 5000;
const app = express();

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = socketio(server);

const games: Games = {};
const players: Players = {};

io.on('connection', socket => {

    console.log(`New socket: ${socket.id}`);

    socket.on('login', (id: string) => {

        if (players[id]) {
            players[id].socket = socket;
            console.log(`Updating socket for player ${id}.`);
        } else {
            players[String(id)] = new Player(id, socket);
            console.log(`Player ${id} joined the game.`);
        }

    });

    socket.on('username', (data: Socket.UsernameUpdate) => {

        const { pid, username } = data;
        if (players[pid]) {
            players[pid].username = username;
        }
        console.log(`Player ${pid} changed username to ${username ? username : '<none>'}.`);

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
        games[data.gid] = new Game(
            data.gid,
            players[data.pid],
            data.packs,
            data.password,
            data.maxScore,
            data.maxPlayers,
            data.timeout
        );
    });

    socket.on('join-game', (data: Socket.JoinGameRequest) => {
        console.log(data);
        if (games[data.gid]) {
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
                message: `Game with ID "${data.gid}" does not exist.`
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

    socket.on('leave-game', (data: Socket.GameRequest) => {

    });

    socket.on('error', e => {
        console.error(e);
    });

    socket.on('disconnect', () => {

        for(const p in players) {

            if (players[p].socket.id === socket.id) {

                console.log(`Player ${players[p].id} has left the game.`);

                for (const g in games) {
                    if (games[g].players.check(players[p].id)) {
                        games[g].players.remove(players[p]);
                    }
                }

                delete players[p];

            }

        }

    });


});

app.get('/info', (_req, res) => {

    const r: LogResponse = {
        players: [],
        games: [],
        any: []
    }

    for (const p in players) {
        r.players.push(p);
    }

    for (const g in games) {
        r.games.push({
            gid: g,
            // @ts-ignore
            players: Object.keys(games[g]._players)
        });
    }

    res.json(r);

});

app.use(express.static(path.join(process.cwd(), '..', 'client', 'dist')));

app.get('**', async (_req, res) => {

    res.sendFile(path.join(process.cwd(), '..', 'client', 'dist', 'index.html'));

});

// Remove games older than 4 hours.
setInterval(() => {

    for (const game in games) {

        if(new Date().getTime() - games[game].created > 12 * 3600 * 1000) {
            delete games[game];
        }

    }

}, 1000 * 1800);

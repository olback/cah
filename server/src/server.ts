import express from 'express';
import socketio from 'socket.io';
import { env } from 'process';
import { Game, Games } from './game';
import { Player, Players } from './player';
import { Client } from 'pg';
import { dbConf } from './config';
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

    socket.on('username', (data: UsernameUpdate) => {

        const { id, username } = data;
        players[id].username = username;

        console.log(`Player ${id} changed username to ${username ? username : '<none>'}.`);

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

        await db.end();

        socket.emit('get-packs-list', packs.sort((a,b) => (a.pack > b.pack) ? 1 : ((b.pack > a.pack) ? -1 : 0)));

    });

    socket.on('new-game', (data: NewGame) => {

        // games[data.gameId] = new Game(data.gameId,)

    });

    socket.on('error', e => {
        console.error(e);
    });

    socket.on('disconnect', () => {

        for(const p in players) {

            if (players[p].socket.id === socket.id) {

                console.log(`Player ${players[p].id} has left the game.`);
                delete players[p];

            }

        }

    });


});

app.get('**', async (_req, res) => {

    const r: LogResponse = {
        players: [],
        games: [],
        any: []
    }

    for (const p in players) {
        r.players.push(p);
    }

    res.json(r);

});

// Remove games older than 4 hours.
setInterval(() => {

    for (const game in games) {

        if(new Date().getTime() - games[game].created > 4 * 3600 * 1000) {
            delete games[game];
        }

    }

}, 1000 * 1800);

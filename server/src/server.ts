import express from 'express';
import socketio from 'socket.io';
import { env } from 'process';
import { Game, Games } from './game';
import { Player, Players } from './player';
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

app.get('**', (_req, res) => {

    const r: LogResponse = {
        players: [],
        games: []
    }

    for (const p in players) {
        r.players.push(p);
    }

    res.json(r);

});

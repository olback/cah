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

        players[String(id)] = new Player(id, socket);
        for (const p in players) {
            console.log(`ID: ${p}`);
        }

    });

    socket.on('username', (data: UsernameUpdate) => {

        const { id, username } = data;
        players[id].username = username;

    });

    socket.on('new-game', (data: NewGame) => {

        // games[data.gameId] = new Game(data.gameId,)

    });

    socket.on('error', e => {
        console.error(e);
    });


});

app.get('**', (_req, res) => {
    res.send('ok');
});

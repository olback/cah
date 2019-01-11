import express from 'express';
import socketio from 'socket.io';
import { env } from 'process';

const port = env.PORT ? Number(env.PORT) : 5000;
const app = express();

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = socketio(server);

io.on('connection', socket => {

    console.log(socket.id);

    socket.on('hello', data => {
        console.log(data);
        socket.emit('m', 'aaaaaaaa');
    });


});

app.get('**', (_req, res) => {
    res.send('ok');
});



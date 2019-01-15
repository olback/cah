import * as socketio from 'socket.io';

interface Players {
    [gameId: string]: Player;
}

class Player {

    public username: string = '';

    constructor(public socket: socketio.Socket) {}

}

export {
    Player,
    Players
}

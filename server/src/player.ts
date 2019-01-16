import * as socketio from 'socket.io';

interface Players {
    [gameId: string]: Player;
}

class Player {

    public username: string = '';
    public inGame: boolean = false;
    public score: number = 0;

    constructor(public id: string, public socket: socketio.Socket) {}

}

export {
    Player,
    Players
}

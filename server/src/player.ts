import * as socketio from 'socket.io';

interface Players {
    [playerId: string]: Player;
}

class Player {

    public username: string = '';
    public inGame: boolean = false;
    public score: number = 0;
    public blanksPlayed: number = 0;
    public hand: WhiteCard[] = [];
    public picks: WhiteCard[] = [];

    constructor(public id: string, public socket: socketio.Socket) {}

    public newRound() {
        this.picks = [];
    }

    public cleanUp() {
        this.inGame = false;
        this.blanksPlayed = 0;
        this.score = 0;
        this.hand = [];
        this.picks = [];
    }

}

export {
    Player,
    Players
}

import * as socketio from 'socket.io';

interface Players {
    [playerId: string]: Player;
}

class Player {

    public username = '';
    public inGame = false;
    public score = 0;
    public blanksPlayed = 0;
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
};

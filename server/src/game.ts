import { Player, Players } from './player';

interface Games {
    [gameId: string]: Game;
}


class Game {

    private _started: boolean = false;
    private _players: Players = {};

    constructor() { }

    start () {
        this._started = true;
        for (const p in this._players) {
            this._players[p].socket.emit('start', null);
        }
    }

    // end() {
    //     this._started = false;
    //     for (const p in this._players) {
    //         this._players[p].socket.emit('end', null);
    //     }
    // }

    addPlayer(player: Player) {
        this._players[player.id] = player;
    }

    removePlayer(player: Player) {
        delete this._players[player.id];
    }

    addPack(pack: string) {
    }

    removePack(pack: string) {
    }

    setPassword(password: string) {
    }

    checkPassword(password: string) {
    }



}

export {
    Game,
    Games
}

import { Player, Players } from './player';

interface Games {
    [gameId: string]: Game;
}


class Game {

    private _started: boolean = false;
    private _players: Players = {};
    private _password = '';
    public created = new Date().getTime();

    constructor(public host: Player, public creatorIP: string) { }

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
        this._password = password;
    }

    checkPassword(password: string) {
        return this._password === password;
    }



}

export {
    Game,
    Games
}

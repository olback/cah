import { Player, Players } from './player';

interface Games {
    [gameId: string]: Game;
}


class Game {

    private _players: Players = {};
    private _password = '';
    // private _packs: string[] = [];
    public created = new Date().getTime();
    public blackCards: BlackCard[] = [];
    public whiteCards: WhiteCard[] = [];
    public settings = {
        winAt: 10,
        maxPlayers: 5,
        timeout: 0
    }

    constructor(
        public id: string,
        private host: Player,
        private _packs: string[]
    ) {
        this.players.add(host);
        // TODO: Fetch cards from database
    }

    // start () {
    //     this._started = true;
    //     for (const p in this._players) {
    //         this._players[p].socket.emit('game-start', null);
    //     }
    // }

    // end() {
    //     this._started = false;
    //     for (const p in this._players) {
    //         this._players[p].socket.emit('end', null);
    //     }
    // }

    public players = {
        add: (player: Player) => {
            if (player.id !in this._players) {
                this._players[player.id] = player;
            }
        },
        remove: (player: Player) => {
            delete this._players[player.id];
        },
        check: (pid: string) => {
            return pid in this.players;
        }
    }

    public packs = {
        add: (pack: string) => {
            return this._packs.push(pack);
        },
        addList: (packs: string[]) => {
            this._packs.concat(packs);
        },
        remove: (pack: string) => {
            for (const [i, v] of this._packs.entries()) {
                if (pack === v) {
                    return Boolean(this._packs.splice(i, 1));
                }
            }
            return false;
        },
        check: (pack: string) => {
            for (const p of this._packs) {
                if (pack === p) {
                    return true;
                }
            }
            return false;
        }
    }

    public password = {
        set: (password: string) => {
            this._password = password;
        },
        check: (password: string) => {
            return this._password === password;
        }
    }

    getState() {
    }

    private sendState(player: Player | 'all') {

        if (player === 'all') {

            for (const p in this._players) {
                this._players[p].socket.emit('game', this.getState());
            }

        } else {

            player.socket.emit('game', this.getState());

        }

    }

}

export {
    Game,
    Games
}

import { Player, Players } from './player';
// import { Client } from 'pg';
// import { dbConf } from './config';

interface PlayedCard extends WhiteCard {
    pid: string;
}

interface Games {
    [gameId: string]: Game;
}

class Game {

    public created = new Date().getTime();

    private _players: Players = {};
    private _bIndex = 0;
    private _blackCards: BlackCard[] = [];
    private _whiteCards: WhiteCard[] = [];
    private _playedCards: PlayedCard[] = [];
    private _czar = this._players[this._host.id].id; // this._players[Object.keys(this._players)[2 % Object.keys(this._players).length]].id?
    private _settings = {
        winAt: 10,
        maxPlayers: 5,
        timeout: 0
    }

    constructor(
        public id: string,
        private _host: Player,
        private _packs: string[],
        private _password: string
    ) {
        this.players.add(_host);
        // TODO: Fetch cards from database
        // const db = new Client(dbConf);
        // db.connect();
        // db.query('select distinct pack from white union select pack from black');
        // db.end();
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

    getState(pid: string): Socket.GameState.State {

        const pa: Socket.GameState.Player[] = [];

        for (const p in this._players) {
            pa.push({
                id: this._players[p].id,
                username: this._players[p].username,
                done: this._players[p].picks.length === this._blackCards[this._bIndex].pick,
                host: this._host.id === this._players[p].id
            });
        }

        const state /*: Socket.GameState*/ = {
            hid: this._host.id,
            gid: this.id,
            czar: this._czar,
            hand: this._players[pid].hand,
            black: this._blackCards[this._bIndex],
            playedCards: this._playedCards,
            players: pa,
            settings: this._settings
        }

        return state;
    }

    private sendState(player: Player | 'all') {

        if (player === 'all') {

            for (const pid in this._players) {
                this._players[pid].socket.emit('game', this.getState(pid));
            }

        } else {

            player.socket.emit('game', this.getState(player.id));

        }

    }

}

export {
    Game,
    Games
}

import { Player, Players } from './player';
import { Client, QueryResult } from 'pg';
import { dbConf } from './config';

// tslint:disable-next-line:no-any
function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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
    private _playedCards: PlayedCards[] = [];
    private _czar = this._host.id;

    constructor(
        public id: string,
        private _host: Player,
        private _packs: string[],
        private _password: string,
        private _maxScore: number,
        public maxPlayers: number,
        private _timeout: number,
        private _blanks: number
    ) {

        const db = new Client(dbConf);
        db.connect();

        const promisesW: Promise<QueryResult>[] = [];
        const promisesB: Promise<QueryResult>[] = [];
        const finalPromises: Promise<void>[] = [];

        for (const p of this._packs) {
            promisesW.push(db.query('select * from white where pack=$1', [p]));
            promisesB.push(db.query('select * from black where pack=$1', [p]));
        }

        finalPromises.push(Promise.all(promisesW).then(v => {
            v.forEach(pack => {
                pack.rows.forEach((row: WhiteCard) => {
                    this._whiteCards.push({
                        id: Number(row.id),
                        text: row.text,
                        pack: row.pack
                    });
                });
            });
        }));

        finalPromises.push(Promise.all(promisesB).then(v => {
            v.forEach(pack => {
                pack.rows.forEach((row: BlackCard) => {
                    this._blackCards.push({
                        id: Number(row.id),
                        text: row.text,
                        pick: Number(row.pick),
                        draw: Number(row.draw),
                        pack: row.pack
                    });
                });
            });
        }));

        Promise.all(finalPromises).then(() => {

            // End db connection
            db.end();

            shuffleArray(this._whiteCards);
            shuffleArray(this._blackCards);

            // Add the host to the players
            this.players.add(_host);

            // Redirect the host to the game
            _host.socket.emit('redirect', ['game', id]);
            // this.sendState(_host); // No need to send the state. The client requests it when being redirected to the game page.
        });

    }

    public players = {
        add: (player: Player) => {
            if (!this.players.check(player.id)) {
                this._players[player.id] = player;
                this._players[player.id].inGame = true;
                for (let i = 0; i < 10; i++) {
                    player.hand.push(this.randomWhiteCard());
                }
                this.sendState('all');
            }
        },
        remove: (player: Player) => {
            // TODO: What happens when the czar leaves? Nothing? The game just pauses?
            if (this.players.check(player.id)) {
                this._players[player.id].cleanUp();
                delete this._players[player.id];
                this.sendState('all');
            }
        },
        check: (pid: string) => {
            for (const p in this._players) {
                if (pid === p) {
                    return true;
                }
            }
            return false;
        },
        amount: () => {
            return Object.keys(this._players).length;
        }
    };

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
            return this._packs.includes(pack);
        }
    };

    public password = {
        set: (password: string) => {
            this._password = password;
        },
        check: (password: string) => {
            return this._password === password;
        }
    };

    private randomWhiteCard(): WhiteCard {

        return this._whiteCards[Math.floor(Math.random() * this._whiteCards.length)];

    }

    getState(pid: string): Socket.GameState.State {

        const pa: Socket.GameState.Player[] = [];

        for (const p in this._players) {
            if (this._players.hasOwnProperty(p)) {
                pa.push({
                    id: this._players[p].id,
                    username: this._players[p].username,
                    done: this._players[p].picks.length === this._blackCards[this._bIndex].pick,
                    host: this._host.id === this._players[p].id,
                    score: this._players[p].score
                });
            }
        }

        const state: Socket.GameState.State = {
            hid: this._host.id,
            gid: this.id,
            czar: this._czar,
            hand: this._players[pid].hand,
            picks: this._players[pid].picks,
            black: this._blackCards[this._bIndex],
            playedCards: this._playedCards,
            players: pa,
            blanksRemaining: this._blanks - this._players[pid].blanksPlayed,
            settings: {
                maxScore: this._maxScore,
                maxPlayers: this.maxPlayers,
                timeout: this._timeout,
                packs: this._packs,
                password: this._password,
                blanks: this._blanks
            }
        };

        return state;
    }

    private sendState(player: Player | 'all') {

        if (player === 'all') {

            for (const pid in this._players) {
                if (this._players.hasOwnProperty(pid)) {
                    this._players[pid].socket.emit('game', this.getState(pid));
                }
            }

        } else {

            player.socket.emit('game', this.getState(player.id));

        }

    }

    pickWhite(pid: string, card: WhiteCard): boolean {

        if (typeof card !== 'object' || card === null) {
            return false;
        }

        for (const [i, wc] of this._players[pid].hand.entries()) {
            if (wc.id === card.id && this._players[pid].picks.length < this._blackCards[this._bIndex].pick) {
                this._players[pid].picks.push(card);
                this._players[pid].hand.splice(i, 1);
                this._players[pid].hand.push(this.randomWhiteCard());
                if (this._players[pid].picks.length === this._blackCards[this._bIndex].pick) {
                    this._playedCards.push({
                        pid: pid,
                        cards: this._players[pid].picks
                    });
                    shuffleArray(this._playedCards);
                    this.sendState('all');
                }
                return true;
            }
        }

        return false;

    }

    blankPick(card: Socket.CustomWhite) {

        if (this._players[card.pid].blanksPlayed < this._blanks) {
            this._players[card.pid].blanksPlayed++;
            this._players[card.pid].picks.push({
                id: Number((Math.random() * 100000000).toFixed(0)) + 100000000,
                pack: 'Custom Card',
                text: card.text
            });

            if (this._players[card.pid].picks.length === this._blackCards[this._bIndex].pick) {
                this._playedCards.push({
                    pid: card.pid,
                    cards: this._players[card.pid].picks
                });
                shuffleArray(this._playedCards);
                this.sendState('all');
            }

            return true;

        }

        return false;

    }

    pickWinner(winner: string) {

        this._players[winner].score++;
        this._playedCards = [];
        this._bIndex++;
        this._czar = Object.keys(this._players)[this._bIndex % Object.keys(this._players).length];
        for (const p in this._players) {
            if (this._players.hasOwnProperty(p)) {
                this._players[p].newRound();
                this._players[p].socket.emit('round-winner', {
                    pid: winner
                });
            }
        }
        setTimeout(() => {
            this.sendState('all');
        }, 5000);
    }

}

export {
    Game,
    Games
};

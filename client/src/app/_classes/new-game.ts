import { GameRequest } from './game-request';

export class NewGame implements GameRequest {
    constructor(
        public pid: string,
        public gid: string,
        public maxScore: number,
        public maxPlayers: number,
        public timeout: number,
        public packs: string[],
        public password: string,
        public blanks: number,
    ) { }

    [key: string]: any;

    set _maxScore(v: number) {
        this.sanitize('maxScore', 100, 3, v);
    }

    get _maxScore() {
        return this.maxScore;
    }

    set _maxPlayers(v: number) {
        this.sanitize('maxPlayers', 10, 3, v);
    }

    get _maxPlayers() {
        return this.maxPlayers;
    }

    set _blanks(v: number) {
        this.sanitize('blanks', 100, 0, v);
    }

    get _blanks() {
        return this.blanks;
    }

    // This is horrible. Truly shit. It's just to make sure the user sees the ACTUAL value instead of
    // whatever the user input was. Set the value to the user value, wait and insert the real value.
    // This is needed because Angular does not update the view unless the value changes.
    // Just writing:
    // this[property] = value;
    // if (value > maxValue) {
    //     this[property] = maxValue;
    // } else if (value < minValue) {
    //     this[property] = minValue;
    // } else {
    //     this[property] = value;
    // }
    // is somehow too fast and does not allow Angular to detect the change.
    private sanitize(property: string, maxValue: number, minValue: number, value: number | null) {
        this[property] = value;
        setTimeout(() => {
            if (value > maxValue) {
                this[property] = maxValue;
            } else if (value < minValue) {
                this[property] = minValue;
            } else {
                this[property] = value;
            }
        }, 1);
    }

}

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
}

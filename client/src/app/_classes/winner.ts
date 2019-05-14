import { GameRequest } from './game-request';

export class Winner implements GameRequest {
    constructor(
        public pid: string,
        public gid: string,
        public winner: string
    ) { }
}

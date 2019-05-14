import { GameRequest } from './game-request';

export class JoinGame implements GameRequest {
    constructor(
        public pid: string,
        public gid: string,
        public password: string
    ) { }
}

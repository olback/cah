import { GameRequest } from './game-request';

export class BlankCard implements GameRequest {
    constructor(
        public pid: string,
        public gid: string,
        public text: string
    ) { }
}

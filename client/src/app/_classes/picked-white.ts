import { GameRequest } from './game-request';

export class PickedWhite implements GameRequest {
    constructor(
        public pid: string,
        public gid: string,
        public card: WhiteCard
    ) { }
}

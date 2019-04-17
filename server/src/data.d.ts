interface WhiteCard {
    id: number;
    text: string;
}

interface BlackCard extends WhiteCard {
    pick: number;
    draw: number;
}

interface Pack {
    pack: string;
    black: number;
    white: number;
}

interface LogResponse {
    players: string[];
    games: string[];
    any: any;
}

declare namespace Socket {

    interface Error {
        message: string;
    }

    interface Request {
        pid: string;
    }

    interface UsernameUpdate extends Request {
        username: string;
    }

    interface GameRequest extends Request {
        gid: string;
    }

    interface NewGame extends GameRequest {
        packs: string[];
    }

    interface JoinGameRequest extends GameRequest {
        password: string;
    }


}

interface WhiteCard {
    id: number;
    text: string;
    pack: string;
}

interface BlackCard extends WhiteCard {
    pick: number;
    draw: number;
}

interface PlayedCard extends WhiteCard {
    pid: string;
}

interface Pack {
    pack: string;
    black: number;
    white: number;
}

interface LogResponse {
    players: string[];
    games: any[];
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
        maxScore: number;
        maxPlayers: number;
        timeout: number;
        packs: string[];
        password: string;
    }

    interface JoinGameRequest extends GameRequest {
        password: string;
    }

    namespace GameState {

        interface Player {
            username: string;
            id: string;
            done: boolean;
            host: boolean;
            score: number;
        }

        interface State {
            hid: string;
            gid: string;
            czar: string;
            hand: WhiteCard[];
            picks: WhiteCard[];
            black: BlackCard;
            playedCards: PlayedCard[];
            players: Player[];
            packs: string[];
            winAt: number;
            maxPlayers: number;
            timeout: number;
        }

    }

}

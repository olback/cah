interface WhiteCard {
    id: number;
    text: string;
    pack: string;
}

interface BlackCard extends WhiteCard {
    pick: number;
    draw: number;
}

interface PlayedCards {
    pid: string;
    winner?: true;
    cards: WhiteCard[];
}

declare namespace ISocket {

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
            black: BlackCard;
            playedCards: PlayedCards[];
            players: Player[];
            packs: string[];
            winAt: number;
            maxPlayers: number;
            timeout: number;
            blanksRemaining: number;
        }

    }

}

interface Games {
    [gameId: string]: Game;
}


class Game {

    public packs: any;

    constructor(players: string[], packs: string[]) {

    }

}

export {
    Game,
    Games
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(id, socket) {
        this.id = id;
        this.socket = socket;
        this.username = '';
        this.inGame = false;
        this.score = 0;
    }
    return Player;
}());
exports.Player = Player;

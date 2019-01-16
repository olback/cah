"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game() {
        this._started = false;
        this._players = {};
    }
    Game.prototype.start = function () {
        this._started = true;
        for (var p in this._players) {
            this._players[p].socket.emit('start', null);
        }
    };
    // end() {
    //     this._started = false;
    //     for (const p in this._players) {
    //         this._players[p].socket.emit('end', null);
    //     }
    // }
    Game.prototype.addPlayer = function (player) {
        this._players[player.id] = player;
    };
    Game.prototype.removePlayer = function (player) {
        delete this._players[player.id];
    };
    Game.prototype.addPack = function (pack) {
    };
    Game.prototype.removePack = function (pack) {
    };
    Game.prototype.setPassword = function (password) {
    };
    Game.prototype.checkPassword = function (password) {
    };
    return Game;
}());
exports.Game = Game;

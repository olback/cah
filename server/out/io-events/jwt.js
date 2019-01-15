"use strict";
module.exports = function (socket) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log(args);
    socket.emit('m', 'aaaaaaaa');
};

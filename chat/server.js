let http = require("http");
let ws = require("nodejs-websocket");
let fs = require("fs");

let server = ws.createServer(function (connection) {
    connection.nickname = null;
    connection.on("text", function (str) {
        if (connection.nickname === null) {
            let valid = true;
            server.connections.forEach(function (connection) {
                if (connection.nickname && connection.nickname === str) {
                    valid = false;
                }
            });
            if (valid) {
                connection.nickname = str;
                broadcast(str, 'entered');
            } else {
                connection.send(JSON.stringify({
                    action: 'error',
                    message: 'Nick name already in use'
                }));
            }
        } else
            broadcast(connection.nickname, 'text', str);
    });
    connection.on("close", function () {
        broadcast(connection.nickname, 'left');
    });
    connection.on("error", function (e) {
    });
});

server.listen(8081);

function broadcast(nickname = null, action = null, message = null) {
    server.connections.forEach(function (connection) {
        connection.send(JSON.stringify({
            nickname: nickname,
            action: action,
            message: message,
            timestamp: new Date().toISOString()
        }));
    })
}
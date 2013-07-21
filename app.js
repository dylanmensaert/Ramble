"use strict";

var express, http, io, path, app, server;

express = require("express");
http = require("http");
path = require("path");

app = express();

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(express.static(path.join(__dirname, "public")));

if ("development" === app.get("env")) {
    app.use(express.errorHandler());
}

server = require("http").createServer(app);
io = require("socket.io").listen(server);

server.listen(8001);

io.sockets.on("connection", function (socket) {
    socket.emit("news", { hello : "world" });
    socket.on("my other event", function (data) {
        console.log(data);
    });
});

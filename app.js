/* jshint node: true */
"use strict";

var express, http, socketio, path, app, routes, server, io, staticPath;

express = require("express");
http = require("http");
socketio = require("socket.io");
path = require("path");
routes = require("./routes");

app = express();

if (app.get("env") === "production") {
    staticPath = "dist";
} else if (app.get("env") === "development") {
    staticPath = "public";

    app.use(express.errorHandler());
}

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.logger("dev"));
app.use(express.compress());
app.use(express.favicon(path.join(__dirname, staticPath, "/images/favicon.ico")));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get("/", routes.index);

app.use(express.static(path.join(__dirname, staticPath)));

server = http.createServer(app);
io = socketio.listen(server);

server.listen(app.get("port"));

io.sockets.on("connection", function (socket) {
    socket.emit("news", { hello : "world" });
    socket.on("my other event", function (data) {
        console.log(data);
    });
});

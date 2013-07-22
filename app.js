"use strict";

var express, http, socketio, path, app, routes, server, io, staticPath, port;

express = require("express");
http = require("http");
socketio = require("socket.io");
path = require("path");
routes = require("./routes");

app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(express.session());
app.use(app.router);

app.get("/", routes.index);

server = http.createServer(app);
io = socketio.listen(server);

if (app.get("env") === "production") {
    staticPath = "dist";
    port = 8001;
} else if (app.get("env") === "development") {
    staticPath = "public";
    port = 3000;

    app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, staticPath)));

server.listen(port);

io.sockets.on("connection", function (socket) {
    socket.emit("news", { hello : "world" });
    socket.on("my other event", function (data) {
        console.log(data);
    });
});

"use strict";

var express = require("express"),
    http = require("http"),
    socketio = require("socket.io"),
    path = require("path"),
    routes = require("./routes"),
    app, staticPath, server, io;

app = express();

if (app.get("env") === "production") {
    staticPath = "dist";
} else if (app.get("env") === "development") {
    staticPath = "assets";

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
app.use(express.static(path.join(__dirname, staticPath)));

app.get("/", routes.index);

server = http.createServer(app);
io = socketio.listen(server);

server.listen(app.get("port"));

io.sockets.on("connection", function (socket) {
    socket.emit("news", { hello: "world" });
    socket.on("my other event", function (data) {
        console.log(data);
    });
});

module.exports = app;

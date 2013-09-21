/* jshint maxstatements: false, browser: true */
define(function (require) {
    "use strict";

    var App = require("init/app");

    require("init/templates");
    require("init/presentation");
    require("init/session");
    require("init/router");

    require("application/init");
    require("index/init");
    require("login/init");
    require("lobby/init");
    require("player/init");

    //TODO: Create API in Express.js
    App.Lobby.FIXTURES = [
        {
            "id": "l1",
            "title": "Game Dylan en Dimitri",
            "password": "zonneschijn",
            "maxMembers": "5",
            "owner": ["p1"],
            "members": ["p2", "p3", "p5", "p8"]
        },
        {
            "id": "l2",
            "title": "customgame",
            "password": "Peter",
            "maxMembers": "7",
            "owner": ["p8"],
            "members": ["p4", "p9", "p3"]
        },
        {
            "id": "l3",
            "title": "winners lobby!",
            "password": "Dolfijn",
            "maxMembers": "12",
            "owner": ["p6"],
            "members": ["p5", "p3", "p8", "p1"]
        },
        {
            "id": "l4",
            "title": "eten",
            "password": "open",
            "maxMembers": "7",
            "owner": ["p8"],
            "members": []
        }
    ];

    App.Player.FIXTURES = [
        {
            "id": "p1",
            "username": "donut",
            "email": "aaaa@gmail.com",
            "ownedLobbies": ["l1"],
            "joinedLobbies": ["l3"]
        },
        {
            "id": "p2",
            "username": "pizaa",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": ["l1"]
        },
        {
            "id": "p3",
            "username": "zizima",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": ["l1", "l2", "l3"]
        },
        {
            "id": "p4",
            "username": "madeentje",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": ["l2"]
        },
        {
            "id": "p5",
            "username": "cryptex",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": ["l3", "l1"]
        },
        {
            "id": "p6",
            "username": "heca",
            "email": "aaaa@gmail.com",
            "ownedLobbies": ["l3"],
            "joinedLobbies": []
        },
        {
            "id": "p7",
            "username": "bosbes",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": []
        },
        {
            "id": "p8",
            "username": "graaaah",
            "email": "aaaa@gmail.com",
            "ownedLobbies": ["l2", "l4"],
            "joinedLobbies": ["l3", "l1"]
        },
        {
            "id": "p9",
            "username": "antiliaan",
            "email": "aaaa@gmail.com",
            "ownedLobbies": [],
            "joinedLobbies": ["l2"]
        }
    ];

    App.advanceReadiness();

    //TODO: Is needed to run tests in Phantom.js with Jasmine?
    window.isAppInitialized = true;
});

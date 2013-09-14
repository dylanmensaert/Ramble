/* jshint browser: true, maxstatements: false */
define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize: function () {
            require("templates");

            require("app/presentation").initialize();
            require("app/router").initialize();

            require("application/init").initialize();
            require("index/init").initialize();
            require("login/init").initialize();
            require("lobby/init").initialize();
            require("player/init").initialize();

            //TODO: Create API in Express.js
            App.Lobby.FIXTURES = [
                {
                    "id": 1,
                    "title": "Game Dylan en Dimitri",
                    "password": "zonneschijn",
                    "maxMembers": "5",
                    "owner": [1],
                    "members": [2, 3, 5, 8]
                },
                {
                    "id": 2,
                    "title": "customgame",
                    "password": "Peter",
                    "maxMembers": "7",
                    "owner": [8],
                    "members": [4, 9, 3]
                },
                {
                    "id": 3,
                    "title": "winners lobby!",
                    "password": "Dolfijn",
                    "maxMembers": "12",
                    "owner": [6],
                    "members": [5, 3, 8, 1]
                },
                {
                    "id": 4,
                    "title": "eten",
                    "password": "open",
                    "maxMembers": "7",
                    "owner": [8],
                    "members": []
                }
            ];

            App.Player.FIXTURES = [
                {
                    "id": 1,
                    "username": "donut",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [1],
                    "joinedLobbies": [3]
                },
                {
                    "id": 2,
                    "username": "pizaa",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": [1]
                },
                {
                    "id": 3,
                    "username": "zizima",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": [1, 2, 3]
                },
                {
                    "id": 4,
                    "username": "madeentje",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": [2]
                },
                {
                    "id": 5,
                    "username": "cryptex",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": [3, 1]
                },
                {
                    "id": 6,
                    "username": "heca",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [3],
                    "joinedLobbies": []
                },
                {
                    "id": 7,
                    "username": "bosbes",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": []
                },
                {
                    "id": 8,
                    "username": "graaaah",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [2, 4],
                    "joinedLobbies": [3, 1]
                },
                {
                    "id": 9,
                    "username": "antiliaan",
                    "email": "aaaa@gmail.com",
                    "ownedLobbies": [],
                    "joinedLobbies": [2]
                }
            ];

            App.advanceReadiness();

            //TODO: Is needed to run tests in Phantom.js with Jasmine?
            window.isAppInitialized = true;
        }
    };
});

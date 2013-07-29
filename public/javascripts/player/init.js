/* jshint maxstatements: false */
define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize : function () {
            App.Player = require("player/model");

            App.Player.FIXTURES = [
                {
                    "id" : 1,
                    "username" : "donut",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [1],
                    "joinedLobbies" : [3]
                },
                {
                    "id" : 2,
                    "username" : "pizaa",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [1]
                },
                {
                    "id" : 3,
                    "username" : "zizima",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [1, 2, 3]
                },
                {
                    "id" : 4,
                    "username" : "madeentje",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [2]
                },
                {
                    "id" : 5,
                    "username" : "cryptex",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [3, 1]
                },
                {
                    "id" : 6,
                    "username" : "heca",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [3],
                    "joinedLobbies" : []
                },
                {
                    "id" : 7,
                    "username" : "bosbes",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : []
                },
                {
                    "id" : 8,
                    "username" : "graaaah",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [2, 4],
                    "joinedLobbies" : [3, 1]
                },
                {
                    "id" : 9,
                    "username" : "antiliaan",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [2]
                }
            ];

            App.PlayerRoute = require("player/root/route");
            App.PlayerController = require("player/root/controller");
            App.PlayerView = require("player/root/view");

            App.PlayerIndexRoute = require("player/index/route");
            App.PlayerIndexController = require("player/index/controller");
            App.PlayerIndexView = require("player/index/view");

            App.PlayerCreateRoute = require("player/create/route");
            App.PlayerCreateController = require("player/create/controller");
            App.PlayerCreateView = require("player/create/view");

            App.PlayerEditRoute = require("player/edit/route");
            App.PlayerEditController = require("player/edit/controller");
            App.PlayerEditView = require("player/edit/view");

            App.PlayerDeleteRoute = require("player/delete/route");
            App.PlayerDeleteController = require("player/delete/controller");
            App.PlayerDeleteView = require("player/delete/view");

            App.PlayerListRoute = require("player/list/route");
            App.PlayerListController = require("player/list/controller");
            App.PlayerListView = require("player/list/view");
        }
    };
});

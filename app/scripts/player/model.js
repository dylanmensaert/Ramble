define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        username : DS.attr("string"),
        password : DS.attr("string"),
        email : DS.attr("string"),
        ownedLobbies : DS.hasMany("App.Lobby", {
            inverse : "owner"
        }),
        joinedLobbies : DS.hasMany("App.Lobby", {
            inverse : "players"
        })
    });
});

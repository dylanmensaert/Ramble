define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        name : DS.attr("string"),
        ownedLobbies : DS.hasMany("App.Lobby"),
        joinedLobbies: DS.hasMany("App.Lobby")
    });
});

define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        name : DS.attr("string"),
        lobbies: DS.hasMany("App.Lobby")
    });
});

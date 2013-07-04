define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        title : DS.attr("string"),
        password : DS.attr("string"),
        maxPlayers: DS.attr("number"),
        players: DS.hasMany('App.Player')
    });
});

define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        lobbyItem = require("lobby/helpers/item");

    return Ember.View.extend({
        lobbyItem : lobbyItem
    });
});

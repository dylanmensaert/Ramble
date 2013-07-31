define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.View.extend({
        lobbyItem : require("lobby/helpers/item")
    });
});

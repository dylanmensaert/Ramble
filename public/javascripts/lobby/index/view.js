define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.View.extend({
        playerItem : require("player/helpers/item")
    });
});

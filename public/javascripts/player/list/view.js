define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        playerItem = require("player/helpers/item");

    return Ember.View.extend({
        playerItem : playerItem
    });
});

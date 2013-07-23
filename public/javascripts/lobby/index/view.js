define([
    "Ember", "player/helpers/item"
], function (Ember, playerItem) {
    "use strict";

    return Ember.View.extend({
        playerItem : playerItem
    });
});

define([
    "Ember", "lobby/helpers/item"
], function (Ember, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        templateName : "player/index",
        lobbyItem : lobbyItem
    });
});

define([
    "Ember", "lobby/helpers/item"
], function (Ember, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        lobbyItem : lobbyItem
    });
});

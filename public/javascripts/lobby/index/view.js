define([
    "Ember", "player/helpers/item"
], function (Ember, playerItem) {
    "use strict";

    return Ember.View.extend({
        templateName : "lobby/index",
        playerItem : playerItem.extend({
            isOwnerOfLobbyBinding : "parentView.controller.isOwnerOfLobby"
        })
    });
});

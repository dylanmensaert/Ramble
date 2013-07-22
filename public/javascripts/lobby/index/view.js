define([
    "Ember", "hbs!lobby/index/template.handlebars", "player/helpers/item"
], function (Ember, template, playerItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template,
        playerItem : playerItem.extend({
            isOwnerOfLobbyBinding : "parentView.controller.isOwnerOfLobby"
        })
    });
});

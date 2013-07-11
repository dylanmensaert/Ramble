define([
    "Ember", "text!lobby/index/template.handlebars", "player/helpers/item"
], function (Ember, template, playerItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        playerItem : playerItem.extend({
            isOwnerOfLobbyBinding : "parentView.controller.isOwnerOfLobby",
            itemIdName : "lobby-player-list",
            accordionId : Ember.computed(function () {
                return "#" + this.get("parentView.accordionId");
            }).property("parentView.accordionId")
        }),
        accordionId : "accordion-lobby-player-list"
    });
});

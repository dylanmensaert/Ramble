define([
    "Ember", "text!player/index/template.handlebars", "lobby/helpers/item"
], function (Ember, template, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        ownedLobbyItem : lobbyItem.extend({
            itemIdName : "owned-lobby-list",
            accordionId : Ember.computed(function () {
                return "#" + this.get("parentView.accordionOwnedLobbiesId");
            }).property("parentView.accordionOwnedLobbiesId")
        }),
        accordionOwnedLobbiesId : "accordion-owned-lobby-list",
        joinedLobbyItem : lobbyItem.extend({
            itemIdName : "joined-lobby-list",
            accordionId : Ember.computed(function () {
                return "#" + this.get("parentView.accordionJoinedLobbiesId");
            }).property("parentView.accordionJoinedLobbiesId")
        }),
        accordionJoinedLobbiesId : "accordion-joined-lobby-list"
    });
});

define([
    "Ember", "text!lobby/list/template.handlebars", "lobby/helpers/item"
], function (Ember, template, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        lobbyItem : lobbyItem.extend({
            itemIdName : "lobby-list",
            accordionId : Ember.computed(function () {
                return "#" + this.get("parentView.accordionId");
            }).property("parentView.accordionId")
        }),
        accordionId : "accordion-lobby-list"
    });
});

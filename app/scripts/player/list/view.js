define([
    "Ember", "text!player/list/template.handlebars", "player/helpers/item"
], function (Ember, template, playerItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        accordionId : "accordion-player-list",
        playerItem : playerItem.extend({
            itemIdName : "player-list",
            accordionId : Ember.computed(function () {
                return "#" + this.get("parentView.accordionId");
            }).property("parentView.accordionId")
        })
    });
});

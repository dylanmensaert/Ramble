define([
    "Ember", "text!lobby/index/template.handlebars", "player/root/item"
], function (Ember, template, playerItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        playerItem : playerItem
    });
});

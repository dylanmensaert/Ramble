define([
    "Ember", "text!lobbies/create/template.handlebars", "lobby/root/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});

define([
    "Ember", "text!lobbies/create/template.handlebars", "lobby/helpers/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});

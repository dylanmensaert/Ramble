define([
    "Ember", "text!player/edit/template.handlebars", "player/root/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});
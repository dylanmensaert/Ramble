define([
    "Ember", "text!lobby/edit/template.handlebars", "lobby/root/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});

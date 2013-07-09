define([
    "Ember", "text!signup/root/template.handlebars", "player/helpers/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});

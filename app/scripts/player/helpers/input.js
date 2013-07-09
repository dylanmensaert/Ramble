define([
    "Ember", "text!player/helpers/input.handlebars", "application/helpers/output"
], function (Ember, template, output) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        output : output
    });
});

define([
    "Ember", "text!players/create/template.handlebars", "player/helpers/input"
], function (Ember, template, input) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        input : input
    });
});

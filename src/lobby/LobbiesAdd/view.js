define([
    "Ember", "text!LobbiesAddFolder/template.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template)
    });
});

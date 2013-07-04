define([
    "Ember", "text!LobbyRemove/template.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template)
    });
});

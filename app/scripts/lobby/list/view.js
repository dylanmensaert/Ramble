define([
    "Ember", "text!lobby/list/template.handlebars", "lobby/helpers/item"
], function (Ember, template, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        lobbyItem : lobbyItem.extend({
            tagName : "li"
        })
    });
});

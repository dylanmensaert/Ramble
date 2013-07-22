define([
    "Ember", "hbs!player/index/template.handlebars", "lobby/helpers/item"
], function (Ember, template, lobbyItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template,
        lobbyItem : lobbyItem
    });
});

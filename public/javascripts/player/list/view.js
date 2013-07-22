define([
    "Ember", "hbs!player/list/template.handlebars", "player/helpers/item"
], function (Ember, template, playerItem) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template,
        playerItem : playerItem
    });
});

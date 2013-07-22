define([
    "Ember", "hbs!player/helpers/item.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template,
        tagName : "li"
    });
});

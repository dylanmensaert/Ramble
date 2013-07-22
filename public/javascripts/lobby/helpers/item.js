define([
    "Ember", "hbs!lobby/helpers/item.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template,
        tagName : "li"
    });
});

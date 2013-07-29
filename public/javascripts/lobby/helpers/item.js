define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.View.extend({
        templateName : "lobby/helpers/item",
        tagName : "li"
    });
});

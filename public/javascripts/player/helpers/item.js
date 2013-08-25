define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.View.extend({
        templateName : "player/helpers/item",
        tagName : "li",
        classNames : "list-group-item"
    });
});

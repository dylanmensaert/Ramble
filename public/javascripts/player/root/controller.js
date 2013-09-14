define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend({
        documentTitle: "Player",
        isLeaf: false
    });
});

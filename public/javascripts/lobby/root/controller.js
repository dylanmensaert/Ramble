define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend({
        documentTitle : "Lobby",
        isLeaf : false
    });
});

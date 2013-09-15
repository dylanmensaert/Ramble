define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Controller.extend({
        documentTitle: "Home",
        isLeaf: true
    });
});

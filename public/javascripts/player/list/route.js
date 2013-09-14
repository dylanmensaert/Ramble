define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        model: function () {
            return this.get("store").findAll("player");
        }
    });
});

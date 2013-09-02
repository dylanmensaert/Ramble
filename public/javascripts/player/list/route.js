define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        model: function () {
            return this.store.find("player");
        }
    });
});

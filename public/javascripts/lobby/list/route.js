define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        model: function () {
            return this.store.find("lobby");
        }
    });
});

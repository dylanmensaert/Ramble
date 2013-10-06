define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        title: function () {
            return this.get("controller.username");
        }.property("controller.username")
    });
});

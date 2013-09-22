define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        title: function () {
            return this.get("controller.model.username");
        }.property("controller.model.username")
    });
});

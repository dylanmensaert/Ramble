define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("helpers/check-ownership-mixin"), {
        title: function () {
            return this.get("controller.model.username") + " - Delete";
        }.property("controller.model.username"),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        }
    });
});

define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("helpers/check-ownership-mixin"), require("helpers/model-rollback-mixin"), {
        title: function () {
            return this.get("controller.model.title") + " - Edit";
        }.property("controller.model.title"),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model.get("owner"), transition);
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

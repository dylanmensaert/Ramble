define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("helpers/check-ownership-mixin"), require("helpers/model-rollback-mixin"), {
        //TODO: Title-property is similar to all siblings..abstract to mixin?
        title: function () {
            return this.get("controller.username") + " - Edit";
        }.property("controller.username"),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

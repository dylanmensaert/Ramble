define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/check-ownership-mixin"), require("helpers/model-rollback-mixin"), {
        deactivate: function () {
            this.checkToRollbackModel();
        },
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        }
    });
});

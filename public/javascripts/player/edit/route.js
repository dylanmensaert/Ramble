define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/check-ownership-mixin"), require("helpers/model-rollback-mixin"), {
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/check-ownership-mixin"), {
        deactivate: function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel: function (model, transition) {
            this.checkOwnership(model.get("owner"), transition);
        }
    });
});

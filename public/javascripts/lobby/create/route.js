define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend(require("login/helpers/transitionToLoginMixin"), {
        model: function () {
            return this.store.createRecord("lobby");
        },
        deactivate: function () {
            //TODO: This piece of code is recurring in a lot of Route's..create a mixin for it.
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionToLogin(transition);
            }
        }
    });
});

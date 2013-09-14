define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/transition-to-login-mixin"), {
        model: function () {
            return this.get("store").createRecord("lobby");
        },
        deactivate: function () {
            //TODO: This piece of code is recurring in a lot of Route's..create a mixin for it.
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.rollback();
            }
        },
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionToLogin(transition);
            }
        }
    });
});

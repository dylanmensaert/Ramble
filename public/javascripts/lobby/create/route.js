define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/login-redirect-mixin"), {
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
        beforeModel: function (transition) {
            if (!this.get("session.isLoggedIn")) {
                this.redirectToLogin(transition);
            }
        }
    });
});

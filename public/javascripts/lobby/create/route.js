define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/login-redirect-mixin"), require("helpers/model-rollback-mixin"), {
        model: function () {
            return this.get("store").createRecord("lobby");
        },
        deactivate: function () {
            this.checkToRollbackModel();
        },
        beforeModel: function (transition) {
            if (!this.get("session.isLoggedIn")) {
                this.redirectToLogin(transition);
            }
        }
    });
});

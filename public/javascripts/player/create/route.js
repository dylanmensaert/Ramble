define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("helpers/model-rollback-mixin"), {
        model: function () {
            return this.get("store").createRecord("player");
        },
        beforeModel: function () {
            if (this.get("session.isLoggedIn")) {
                this.transitionTo("index");
            }
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

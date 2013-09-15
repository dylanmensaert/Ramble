define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("helpers/model-rollback-mixin"), {
        model: function () {
            return this.get("store").createRecord("player");
        },
        deactivate: function () {
            this.checkToRollbackModel();
        },
        beforeModel: function () {
            if (this.get("session.isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

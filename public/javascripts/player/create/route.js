define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        model: function () {
            return this.store.createRecord("player");
        },
        deactivate: function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel: function () {
            if (this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

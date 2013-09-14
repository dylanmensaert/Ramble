define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        model: function () {
            return this.store.createRecord("player");
        },
        deactivate: function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.rollback();
            }
        },
        afterModel: function () {
            if (this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

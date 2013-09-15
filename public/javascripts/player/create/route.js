define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        model: function () {
            return this.get("store").createRecord("player");
        },
        deactivate: function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.rollback();
            }
        },
        beforeModel: function () {
            if (this.get("session.isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

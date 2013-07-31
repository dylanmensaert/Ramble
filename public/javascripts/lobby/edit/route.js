define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        deactivate : function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel : function (model) {
            //TODO On every delete/edit: first check if logged in, then check if owner/account.
            if (this.controllerFor("application").get("account") !== model.get("owner")) {
                this.transitionTo("login");
            }
        }
    });
});

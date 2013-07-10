define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            var model = this.modelFor("lobby.edit");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel : function (model) {
            if (this.controllerFor("application").get("account") !== model.get("owner")) {
                this.transitionTo("login");
            }
        }
    });
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            var model = this.modelFor("player.edit");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel : function (model) {
            if (this.controllerFor("application").get("account") !== model) {
                this.transitionTo("login");
            }
        }
    });
});

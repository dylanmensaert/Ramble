define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            var model = this.modelFor("lobby");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        redirect : function () {
            if (this.controllerFor("application").get("account") != this.modelFor("lobby").get("owner")) {
                this.transitionTo("login");
            }
        }
    });
});

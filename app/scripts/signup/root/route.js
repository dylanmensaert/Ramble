define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        model : function () {
            return App.Player.createRecord();
        },
        deactivate : function () {
            var model = this.modelFor("signup");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        redirect : function () {
            if (this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

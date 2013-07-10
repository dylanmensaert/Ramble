define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        model : function () {
            return App.Lobby.createRecord();
        },
        deactivate : function () {
            var model = this.modelFor("lobby.create");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel : function () {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("login");
            }
        }
    });
});

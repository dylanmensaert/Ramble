define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        //TODO: When the users transitions from lobby.create to this route, an error occurs while typing in the fields
        model : function () {
            return App.Player.createRecord();
        },
        deactivate : function () {
            var model = this.modelFor("player.create");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        },
        afterModel : function () {
            if (this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});

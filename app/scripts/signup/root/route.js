define([
    "Ember"
], function (Ember) {
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
        }
    });
});

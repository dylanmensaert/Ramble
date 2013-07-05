define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        events : {
            saveEdits : function () {
                var model = this.modelFor("lobby");

                model.one("didUpdate", this, function () {
                    this.transitionTo("lobby.show", model);
                });
                model.save();
            }
        },
        deactivate : function () {
            var model = this.modelFor("lobby");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        }
    });
});
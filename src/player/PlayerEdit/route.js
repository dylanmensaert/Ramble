define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        events : {
            saveEdits : function () {
                var model = this.modelFor("player");

                model.one("didUpdate", this, function () {
                    this.transitionTo("player.show", model);
                });
                model.save();
            }
        },
        deactivate : function () {
            var model = this.modelFor("player");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        }
    });
});
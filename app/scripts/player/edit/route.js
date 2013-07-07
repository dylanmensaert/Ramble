define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            var model = this.modelFor("player");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.get("transaction").rollback();
            }
        }
    });
});

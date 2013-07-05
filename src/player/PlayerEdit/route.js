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
        },
        goBack : function () {
            var model = this.modelFor("player");

            this.transitionTo("player", model);
        },
        events : {
            saveEdits : function () {
                var model = this.modelFor("player");

                if (model.get("isDirty")) {
                    model.one("didUpdate", this, function () {
                        this.goBack();
                    });

                    model.save();
                } else {
                    this.goBack();
                }
            }
        }
    });
});
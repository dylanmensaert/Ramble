define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        checkToRollbackModel: function () {
            var model = this.get("controller.model");

            if (model.get("isDirty") && !model.get("isSaving")) {
                model.rollback();
            }
        }
    });
});

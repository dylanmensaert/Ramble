define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controllerMixin"), {
        hasObjectModel: true,
        controllerTitle: "Edit",
        save: function () {
            var model = this.get("model");

            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby");
                });

                model.save();
            } else {
                this.transitionToRoute("lobby");
            }
            //    }
            //});
        }
    });
});

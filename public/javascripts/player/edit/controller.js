define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("player/helpers/controllerMixin"), {
        hasObjectModel: true,
        controllerTitle: "Edit",
        actions: {
            save: function () {
                var model = this.get("model");

                //model.validate().then(function () {
                //    if (model.get("isValid")) {
                if (model.get("isDirty")) {
                    model.one("didUpdate", this, function () {
                        this.transitionToRoute("player");
                    });

                    model.save();
                } else {
                    this.transitionToRoute("player");
                }
                //    }
                //});
            }
        }
    });
});

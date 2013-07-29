define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        ControllerMixin = require("lobby/helpers/controllerMixin");

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        controllerTitle : "Edit",
        save : function () {
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

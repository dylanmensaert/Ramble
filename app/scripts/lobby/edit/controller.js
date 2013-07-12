define([
    "Ember", "lobby/helpers/controller"
], function (Ember, Controller) {
    "use strict";

    return Ember.ObjectController.extend(Controller, {
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

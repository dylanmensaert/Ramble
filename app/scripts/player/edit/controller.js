define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        controllerTitle : "Edit",
        save : function () {
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
    });
});

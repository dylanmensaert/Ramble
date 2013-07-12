define([
    "Ember", "lobby/helpers/controller"
], function (Ember, Controller) {
    "use strict";

    return Ember.ObjectController.extend(Controller, {
        controllerTitle : "Create",
        create : function () {
            var model = this.get("model");

            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            model.set("owner", this.get("controllers.application.account"));

            model.one("didCreate", this, function () {
                this.transitionToRoute("lobby", model);
            });

            model.save();
            //    }
            //});
        }
    });
});

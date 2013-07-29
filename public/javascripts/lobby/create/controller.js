define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        ControllerMixin = require("lobby/helpers/controllerMixin");

    return Ember.ObjectController.extend(ControllerMixin, {
        controllerTitle : "Create",
        create : function () {
            var model = this.get("model");

            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            model.set("owner", this.get("account"));

            model.one("didCreate", this, function () {
                this.transitionToRoute("lobby", model);
            });

            model.save();
            //    }
            //});
        }
    });
});

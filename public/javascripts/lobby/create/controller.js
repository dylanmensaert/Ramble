define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controllerMixin"), {
        controllerTitle: "Create",
        create: function () {
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

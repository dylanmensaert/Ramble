define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controller-mixin"), {
        controllerTitle: "Create",
        actions: {
            create: function () {
                var self, model;

                self = this;
                model = this.get("model");

                //model.validate().then(function () {
                //    if (model.get("isValid")) {
                model.set("owner", this.get("session.account"));

                model.save().then(function (model) {
                    self.transitionToRoute("lobby", model);
                });
                //    }
                //});
            }
        }
    });
});

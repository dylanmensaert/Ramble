define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("player/helpers/controller-mixin"), {
        hasObjectModel: true,
        controllerTitle: "Edit",
        actions: {
            save: function () {
                var self, model;

                self = this;
                model = this.get("model");

                //model.validate().then(function () {
                //    if (model.get("isValid")) {
                if (model.get("isDirty")) {
                    model.save().then(function () {
                        self.transitionToRoute("player");
                    });
                } else {
                    this.transitionToRoute("player");
                }
                //    }
                //});
            }
        }
    });
});

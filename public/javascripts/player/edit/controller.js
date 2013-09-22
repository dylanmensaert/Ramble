define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("player/helpers/controller-mixin"), {
        actions: {
            save: function () {
                var model = this.get("model");

                //model.validate().then(function () {
                //    if (model.get("isValid")) {
                if (model.get("isDirty")) {
                    model.save().then(function () {
                        this.transitionToRoute("player");
                    }.bind(this));
                } else {
                    this.transitionToRoute("player");
                }
                //    }
                //});
            }
        }
    });
});

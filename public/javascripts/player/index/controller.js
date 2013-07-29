define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        ControllerMixin = require("player/helpers/controllerMixin");

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        isOwnerOfAccount : Ember.computed(function () {
            return this.get("account") === this.get("model");
        }).property("account", "model")
    });
});

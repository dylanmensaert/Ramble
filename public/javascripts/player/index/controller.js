define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        isOwnerOfAccount : Ember.computed(function () {
            return this.get("account") === this.get("model");
        }).property("account", "model")
    });
});

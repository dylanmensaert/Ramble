define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        isOwnerOfAccount : Ember.computed(function () {
            return this.get("controllers.application.account") === this.get("model");
        }).property("controllers.application.account", "model")
    });
});

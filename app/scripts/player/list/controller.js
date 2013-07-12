define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ArrayController.extend(ControllerMixin, {
        controllerTitle : "List"
    });
});

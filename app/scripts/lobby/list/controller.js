define([
    "Ember", "lobby/helpers/controller"
], function (Ember, Controller) {
    "use strict";

    return Ember.ArrayController.extend(Controller, {
        controllerTitle : "List"
    });
});

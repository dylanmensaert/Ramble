define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        ControllerMixin = require("lobby/helpers/controllerMixin");

    return Ember.ArrayController.extend(ControllerMixin, {
        controllerTitle : "List"
    });
});

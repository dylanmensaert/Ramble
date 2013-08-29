define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ArrayController.extend(require("player/helpers/controllerMixin"), {
        controllerTitle: "List"
    });
});

define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ArrayController.extend(require("lobby/helpers/controllerMixin"), {
        controllerTitle: "List"
    });
});

define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ArrayController.extend(require("player/helpers/controllerMixin"), {
        controllerTitle: "List"
    });
});

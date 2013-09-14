define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ArrayController.extend(require("lobby/helpers/controllerMixin"), {
        controllerTitle: "List"
    });
});

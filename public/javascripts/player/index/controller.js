define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("player/helpers/controllerMixin"), {
        hasObjectModel: true,
        isOwnerOfAccount: function () {
            return this.get("account") === this.get("model");
        }.property("account", "model")
    });
});

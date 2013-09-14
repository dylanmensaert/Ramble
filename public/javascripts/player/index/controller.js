define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("player/helpers/controller-mixin"), {
        hasObjectModel: true,
        isOwnerOfAccount: function () {
            return this.get("account") === this.get("model");
        }.property("account", "model")
    });
});

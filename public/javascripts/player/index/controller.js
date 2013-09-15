define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("player/helpers/controller-mixin"), {
        hasObjectModel: true,
        isOwnerOfAccount: function () {
            return this.get("session.account") === this.get("model");
        }.property("session.account", "model")
    });
});

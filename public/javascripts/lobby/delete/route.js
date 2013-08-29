define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend(require("login/helpers/checkOwnershipMixin"), {
        afterModel: function (model, transition) {
            this.checkOwnership(model.get("owner"), transition);
        }
    });
});

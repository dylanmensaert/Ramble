define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend(require("login/helpers/check-ownership-mixin"), {
        afterModel: function (model, transition) {
            this.checkOwnership(model, transition);
        }
    });
});

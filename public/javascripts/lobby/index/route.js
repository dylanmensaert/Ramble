define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        afterModel: function (model, transition) {
            this.controllerFor("lobby.index").set("currentTransition", transition);
        }
    });
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        //TODO: temporary client-sided test
        setupController : function (controller) {
            controller.set("model", {});
        }
    });
});

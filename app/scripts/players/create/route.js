define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            this.set("controller.username", "");
            this.set("controller.email", "");
            this.set("controller.password", "");
        }
    });
});

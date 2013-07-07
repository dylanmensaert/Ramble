define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            this.get("controller").set("newUsername", "");
            this.get("controller").set("newPassword", "");
        }
    });
});

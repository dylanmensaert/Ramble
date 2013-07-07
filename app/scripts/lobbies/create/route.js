define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            //TODO: Googlen
            this.get("controller").set("newTitle", "");
            this.get("controller").set("newPassword", "");
            this.get("controller").set("newMaxPlayers", "");
        }
    });
});

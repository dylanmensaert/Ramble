define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            //TODO: Googlen
            this.set("controller.title", "");
            this.set("controller.password", "");
            this.set("controller.maxPlayers", "");
        }
    });
});

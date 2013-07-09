define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        deactivate : function () {
            //TODO: Put create-lobby in separate route? Like player-signup
            this.set("controller.title", "");
            this.set("controller.password", "");
            this.set("controller.maxPlayers", "");
        }
    });
});

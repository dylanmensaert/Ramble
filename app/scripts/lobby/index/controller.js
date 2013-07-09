define([
    "lobby/helpers/controller"
], function (Controller) {
    "use strict";

    return Controller.extend({
        //TODO: Change to server side functionality
        leave : function () {
            this.get("players").removeObject(this.get("controllers.application.account"));
            this.get("transaction").commit();

            this.transitionToRoute("lobbies");
        },
        kick : function (player) {
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        }
    });
});

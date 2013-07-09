define([
    "lobby/helpers/controller"
], function (Controller) {
    "use strict";

    return Controller.extend({
        kickPlayerFromLobby : function (player) {
            //TODO: multiple relationship owner + players not working in model
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        }
    });
});

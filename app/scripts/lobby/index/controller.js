define([
    "lobby/helpers/controller"
], function (Controller) {
    "use strict";

    return Controller.extend({
        kickPlayerFromLobby : function (player) {
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        }
    });
});

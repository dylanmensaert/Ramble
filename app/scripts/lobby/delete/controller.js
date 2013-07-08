define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this._super();
        }).property("controllers.lobby.documentTitle"),
        doDelete : function (model) {
            model.one("didDelete", this, function () {
                this.transitionToRoute("lobbies");
            });

            this.deleteRecordCompletely(model);
            model.deleteRecord();

            model.get("transaction").commit();
        },
        deleteRecordCompletely : function (model) {
            model.get("players").forEach(function (player) {
                player.get("joinedLobbies").removeObject(model);
            });
        }
    });
});

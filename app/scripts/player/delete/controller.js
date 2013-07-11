define([
    "player/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        //TODO: Any way to achieve inheriting the dependent keys of a computed property? See: https://github.com/emberjs/ember.js/issues/2976.
        documentTitle : Ember.computed(function () {
            return this._super() + " - " + this.get("username") + " - Delete";
        }).property("username", "controllers.player.documentTitle"),
        needs : ["login"],
        "delete" : function () {
            var model = this.get("model");

            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.get("controllers.login").send("logout");
            });

            //this.removePlayerFromItsJoinedLobbies(model);

            model.get("transaction").commit();
        },
        removePlayerFromItsJoinedLobbies : function (model) {
            model.get("joinedLobbies").forEach(function (lobby) {
                lobby.get("players").removeObject(model);
            });
        }
    });
});

define([
    "lobbies/helpers/controller", "App", "Ember"
], function (Controller, App, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - Create";
        }).property("controllers.lobbies.documentTitle"),
        create : function () {
            var model = App.Lobby.createRecord({
                title : this.get("title"),
                maxPlayers : this.get("maxPlayers"),
                password : this.get("password")
            });

            model.one("didCreate", this, function () {
                this.transitionToRoute("lobby", model);
            });

            model.save();
        }
    });
});

define([
    "players/helpers/controller", "Ember", "App"
], function (Controller, Ember, App) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - Create";
        }).property("controllers.players.documentTitle"),
        create : function () {
            var model = App.Player.createRecord({
                username : this.get("username"),
                email : this.get("email"),
                password : this.get("password")
            });

            model.one("didCreate", this, function () {
                this.transitionToRoute("player", model);
            });

            model.save();
        }
    });
});

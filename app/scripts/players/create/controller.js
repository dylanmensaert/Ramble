define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.players.documentTitle") + " - Create";
        }).property("controllers.players.documentTitle"),
        isLeaf : true,
        needs : ["players"],
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

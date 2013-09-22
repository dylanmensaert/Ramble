define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controller-mixin"), {
        isOwnerOfLobby: function () {
            return this.get("session.account") === this.get("owner");
        }.property("session.account", "owner"),
        //TODO: Check if this computed property actually works?
        filteredOwner: Ember.computed.filter("members", function (player) {
            return this.get("session.account") === player;
        }),
        isMemberOfLobby: function () {
            return this.get("filteredOwner.length") > 0;
        }.property("members.@each", "session.account"),
        actions: {
            leave: function () {
                this.send("kick", this.get("session.account"));
            },
            kick: function (member) {
                var model = this.get("model");

                model.get("members").removeObject(member);
                model.save();
            },
            join: function () {
                var model = this.get("model");

                if (this.get("session.isLoggedIn")) {
                    model.get("members").pushObject(this.get("session.account"));
                    model.save();
                } else {
                    this.transitionToRoute("login");
                }
            }
        }
    });
});

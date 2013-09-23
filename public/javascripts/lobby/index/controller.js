define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend({
        isOwnerOfLobby: function () {
            return this.get("session.account") === this.get("owner");
        }.property("session.account", "owner"),
        //TODO: Check if this computed property actually works?
        isMemberOfLobby: function () {
            //TODO: Use the new "Array Computed Properties" provided in RC8 to improve performance!
            return this.get("members").contains(this.get("session.account"));
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

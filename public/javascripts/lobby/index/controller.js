define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controller-mixin"), {
        hasObjectModel: true,
        isOwnerOfLobby: function () {
            return this.get("account") === this.get("owner");
        }.property("account", "owner"),
        filteredOwner: Ember.computed.filter("members", function (player) {
            return this.get("account") === player;
        }),
        isMemberOfLobby: function () {
            return this.get("filteredOwner.length") > 0;
        }.property("members.@each", "account"),
        actions: {
            leave: function () {
                this.send("kick", this.get("account"));
            },
            kick: function (member) {
                var model = this.get("model");

                model.get("members").removeObject(member);
                model.save();
            },
            join: function () {
                var model = this.get("model");

                if (this.get("isLoggedIn")) {
                    model.get("members").pushObject(this.get("account"));
                    model.save();
                } else {
                    this.transitionToRoute("login");
                }
            }
        }
    });
});

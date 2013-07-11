define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - " + this.get("title");
        }).property("title", "controllers.lobby.documentTitle"),
        needs : ["application"],
        //TODO: Change to server side functionality
        leave : function () {
            var model = this.get("model");

            model.one("didUpdate", this, function () {
                this.transitionToRoute("lobby.list");
            });

            model.get("members").removeObject(this.get("controllers.application.account"));
            model.get("transaction").commit();
        },
        kick : function (member) {
            var model = this.get("model");

            model.get("members").removeObject(member);
            model.get("transaction").commit();
        },
        join : function () {
            var model = this.get("model");

            if (this.get("controllers.application.isLoggedIn")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby.index", model);
                });

                model.get("members").pushObject(this.get("controllers.application.account"));
                model.get("transaction").commit();
            } else {
                this.transitionToRoute("login");
            }
        },
        //TODO: Weird bug when binding account from application or login controller
        //accountBinding : "controllers.application.account",
        //isOwner : Ember.computed(function () {
        //    return this.get("account.id") === this.get("owner.id");
        //}).property("account.id", "owner.id"),
        isOwnerOfLobby : Ember.computed(function () {
            return this.get("controllers.application.account") === this.get("owner");
        }).property("controllers.application.account", "owner"),
        isMemberOfLobby : Ember.computed(function () {
            return this.get("isOwnerOfLobby")
                || this.get("members").contains(this.get("controllers.application.account"));
        }).property("controllers.application.account", "isOwnerOfLobby", "members")
    });
});

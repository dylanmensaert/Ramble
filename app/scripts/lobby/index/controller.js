define([
    "Ember", "lobby/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        leave : function () {
            var account = this.get("controllers.application.account");

            this.send("kick", account);
        },
        kick : function (member) {
            var model = this.get("model");

            model.get("members").removeObject(member);
            model.get("transaction").commit();
        },
        join : function () {
            var model, isLoggedIn, account;

            model = this.get("model");
            isLoggedIn = this.get("controllers.application.isLoggedIn");

            if (isLoggedIn) {
                account = this.get("controllers.application.account");

                model.get("members").pushObject(account);
                model.get("transaction").commit();
            } else {
                this.transitionToRoute("login");
            }
        },
        //TODO: Weird bug when binding account from application or login controller
        //isLoggedInBinding : "controllers.application.isLoggedIn",
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
        }).property("isOwnerOfLobby", "members", "controllers.application.account")
    });
});

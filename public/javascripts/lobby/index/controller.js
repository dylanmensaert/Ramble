define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controllerMixin"), {
        needs : ["login"],
        hasObjectModel : true,
        currentTransition : null,
        leave : function () {
            this.send("kick", this.get("account"));
        },
        kick : function (member) {
            var model = this.get("model");

            model.get("members").removeObject(member);
            model.get("transaction").commit();
        },
        join : function () {
            var model = this.get("model");

            if (this.get("isLoggedIn")) {
                model.get("members").pushObject(this.get("account"));
                model.get("transaction").commit();
            } else {
                this.transitionToLogin();
            }
        },
        transitionToLogin: function () {
            this.set("controllers.login.lastTransition", this.get("currentTransition"));
            this.set("currentTransition", null);
            this.transitionToRoute("login");
        },
        isOwnerOfLobby : function () {
            return this.get("account") === this.get("owner");
        }.property("account", "owner"),
        isMemberOfLobby : function () {
            return this.get("members").contains(this.get("account"));
        }.property("members.@each", "account")
    });
});

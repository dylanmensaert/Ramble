define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("title");
        }).property("title"),
        isLeaf : false,
        needs : ["application"],
        //TODO: Weird bug when binding account from application or login controller
        //accountBinding : "controllers.application.account",
        //isOwner : Ember.computed(function () {
        //    return this.get("account.id") === this.get("owner.id");
        //}).property("account.id", "owner.id"),
        isOwner : Ember.computed(function () {
            return this.get("controllers.application.account") === this.get("owner");
        }).property("controllers.application.account", "owner")
    });
});

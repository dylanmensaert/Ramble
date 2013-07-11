define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            //TODO: Get title from index-controller, for less code-duplication
            return this._super() + " - " + this.get("title") + " - Delete";
        }).property("title", "controllers.lobby.documentTitle"),
        "delete" : function () {
            var model = this.get("model");

            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.transitionToRoute("lobby.list");
            });

            //TODO: Associated members of this lobby don't get this lobby removed from their joinedLobbies-array.
            //model.get("members").forEach(function (member) {
            //    member.get("joinedLobbies").removeObject(model);
            //});

            model.get("transaction").commit();
        }
    });
});

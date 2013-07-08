define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this._super();
        }).property("controllers.lobby.documentTitle"),
        doDelete : function (model) {
            model.one("didDelete", this, function () {
                this.transitionToRoute("lobbies");
            });

            model.deleteRecord();

            model.get("transaction").commit();
        }
    });
});

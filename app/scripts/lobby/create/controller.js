define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - Create";
        }).property("controllers.lobby.documentTitle"),
        needs : ["application"],
        create : function (model) {
            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            model.set("owner", this.get("controllers.application.account"));
            model.one("didCreate", this, function () {
                this.transitionToRoute("lobby", model);
            });

            model.save();
            //    }
            //});
        }
    });
});

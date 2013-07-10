define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - " + this.get("title") + " - Edit";
        }).property("title", "controllers.lobby.documentTitle"),
        save : function (model) {
            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby");
                });

                model.save();
            } else {
                this.transitionToRoute("lobby");
            }
            //    }
            //});
        }
    });
});

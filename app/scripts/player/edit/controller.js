define([
    "player/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - " + this.get("username") + " - Edit";
        }).property("username", "controllers.player.documentTitle"),
        save : function (model) {
            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("player");
                });

                model.save();
            } else {
                this.transitionToRoute("player");
            }
            //    }
            //});
        }
    });
});

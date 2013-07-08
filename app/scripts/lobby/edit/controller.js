define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this._super();
        }).property("controllers.lobby.documentTitle"),
        save : function (model) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby");
                });

                model.save();
            } else {
                this.transitionToRoute("lobby");
            }
        }
    });
});

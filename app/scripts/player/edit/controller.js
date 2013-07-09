define([
    "player/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this._super();
        }).property("controllers.player.documentTitle"),
        save : function (model) {
            if (this.get("isValid")) {
                if (model.get("isDirty")) {
                    model.one("didUpdate", this, function () {
                        this.transitionToRoute("player");
                    });

                    model.save();
                } else {
                    this.transitionToRoute("player");
                }
            }
        },
        text : "Passwords are not equal",
        isValid : Ember.computed(function () {
            return this.get("password") === this.get("confirmPassword");

        }).property("password", "confirmPassword")
    });
});

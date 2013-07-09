define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : "Sign up",
        isLeaf : true,
        signup : function (model) {
            if (this.get("isValid")) {
                model.one("didCreate", this, function () {
                    this.transitionToRoute("player", model);
                });

                model.save();
            }
        },
        text : "Passwords are not equal",
        isValid : Ember.computed(function () {
            return this.get("password") === this.get("confirmPassword");

        }).property("password", "confirmPassword")
    });
});

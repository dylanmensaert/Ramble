define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : "Sign up",
        isLeaf : true,
        signup : function (model) {
            //model.validate().then(function () {
            //    if (model.get("isValid")) {
            model.one("didCreate", this, function () {
                //TODO: this should transition to player profile and automatically log player in
                this.transitionToRoute("login");
            });

            model.save();
            //    }
            //});
        }
    });
});
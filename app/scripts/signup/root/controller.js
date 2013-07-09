define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : "Sign up",
        isLeaf : true,
        signup : function (model) {
                model.one("didCreate", this, function () {
                    this.transitionToRoute("player", model);
                });

                model.save();
        }
    });
});

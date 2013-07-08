define([
    "player/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        //TODO: Any way to achieve inheriting the dependent keys of a computed property? See: https://github.com/emberjs/ember.js/issues/2976.
        documentTitle : Ember.computed(function () {
            return "Delete - " + this._super();
        }).property("controllers.player.documentTitle"),
        doDelete : function (model) {
            model.one("didDelete", this, function () {
                this.transitionToRoute("index");
            });

            model.deleteRecord();

            model.get("transaction").commit();
        }
    });
});

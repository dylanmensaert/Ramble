define([
    "player/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        needs : ["application"],
        //TODO: change .id to the actual object
        isOwner : Ember.computed(function () {
            return this.get("controllers.application.account.id") === this.get("id");
        }).property("controllers.application.account.id", "id")
    });
});

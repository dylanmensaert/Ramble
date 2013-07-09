define([
    "Ember", "player/helpers/controller"
], function (Ember, Controller) {
    "use strict";

    return Controller.extend({
        needs : ["application"],
        //TODO: change .id to concreet object
        isOwner : Ember.computed(function () {
            return this.get("controllers.application.account.id") === this.get("id");
        }).property("controllers.application.account.id", "id")
    });
});

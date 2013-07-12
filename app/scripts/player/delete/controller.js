define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        controllerTitle : "Delete",
        needs : ["application"],
        "delete" : function () {
            var model = this.get("model");

            //TODO: Leave all of the account's joined lobbies before deleting the account.
            //model.get("joinedLobbies").forEach(function (lobby) {
            //    lobby.get("members").removeObject(model);
            //});

            model.one("didDelete", this, function () {
                this.get("controllers.application").send("logout");
            });

            model.deleteRecord();

            model.get("transaction").commit();
        }
    });
});

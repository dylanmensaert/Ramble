define([
    "Ember", "player/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        controllerTitle : "Delete",
        //TODO: use needs application.
        needs : ["login"],
        "delete" : function () {
            var model = this.get("model");

            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.get("controllers.login").send("logout");
            });

            //model.get("joinedLobbies").forEach(function (lobby) {
            //    lobby.get("members").removeObject(model);
            //});

            model.get("transaction").commit();
        }
    });
});

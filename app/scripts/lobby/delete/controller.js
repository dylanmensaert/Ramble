define([
    "Ember", "lobby/helpers/controllerMixin"
], function (Ember, ControllerMixin) {
    "use strict";

    return Ember.ObjectController.extend(ControllerMixin, {
        hasObjectModel : true,
        controllerTitle : "Delete",
        "delete" : function () {
            var model = this.get("model");

            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.transitionToRoute("lobby.list");
            });

            //TODO: Associated members of this lobby don't get this lobby removed from their joinedLobbies-array.
            //model.get("members").forEach(function (member) {
            //    member.get("joinedLobbies").removeObject(model);
            //});

            model.get("transaction").commit();
        }
    });
});

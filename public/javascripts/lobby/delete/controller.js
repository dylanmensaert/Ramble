define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controllerMixin"), {
        hasObjectModel : true,
        controllerTitle : "Delete",
        delete : function () {
            var model = this.get("model");

            //model.one("didUpdate", this, function () {
            model.one("didDelete", this, function () {
                this.transitionToRoute("lobby.list");
            });

            model.deleteRecord();

            model.get("transaction").commit();
            //});

            //TODO: Associated members of this lobby don't get this lobby removed from their joinedLobbies-array.
            //model.get("members").clear();

            //model.get("transaction").commit();
        }
    });
});

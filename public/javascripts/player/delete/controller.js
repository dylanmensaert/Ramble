define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("player/helpers/controllerMixin"), {
        hasObjectModel: true,
        controllerTitle: "Delete",
        delete: function () {
            var model = this.get("model");

            //model.one("didUpdate", this, function () {
            model.one("didDelete", this, function () {
                this.get("controllers.application").send("logout");
            });

            model.deleteRecord();

            model.get("transaction").commit();
            //});

            //TODO: Leave all of the account's joined lobbies AND delete all its owned lobbies before deleting the account.
            //model.get("joinedLobbies").clear();
            //model.get("ownedLobbies").clear();

            //model.get("transaction").commit();
        }
    });
});

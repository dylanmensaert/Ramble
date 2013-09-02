define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.ObjectController.extend(require("player/helpers/controllerMixin"), {
        hasObjectModel: true,
        controllerTitle: "Delete",
        actions: {
            delete: function () {
                var self, model;

                self = this;
                model = this.get("model");

                model.deleteRecord().then(function () {
                    self.get("controllers.application").send("logout");
                });

                //TODO: Leave all of the account's joined lobbies AND delete all its owned lobbies before deleting the account.
                //model.get("joinedLobbies").clear();
                //model.get("ownedLobbies").clear();
            }
        }
    });
});

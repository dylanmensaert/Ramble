define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("player/helpers/controller-mixin"), {
        hasObjectModel: true,
        controllerTitle: "Delete",
        needs: ["login"],
        actions: {
            delete: function () {
                var model = this.get("model");

                model.deleteRecord();
                model.save().then(function () {
                    this.get("controllers.login").send("logout");
                }.bind(this));

                //TODO: Leave all of the account's joined lobbies AND delete all its owned lobbies before deleting the account.
                //model.get("joinedLobbies").clear();
                //model.get("ownedLobbies").clear();
            }
        }
    });
});

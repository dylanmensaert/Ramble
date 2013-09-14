define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controllerMixin"), {
        hasObjectModel: true,
        controllerTitle: "Delete",
        actions: {
            delete: function () {
                var self, model;

                self = this;
                model = this.get("model");

                model.deleteRecord().then(function () {
                    self.transitionToRoute("lobby.list");
                });

                //TODO: Associated members of this lobby don't get this lobby removed from their joinedLobbies-array.
                //model.get("members").clear();
            }
        }
    });
});

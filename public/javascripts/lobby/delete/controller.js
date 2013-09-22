define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend(require("lobby/helpers/controller-mixin"), {
        actions: {
            delete: function () {
                var model = this.get("model");

                model.deleteRecord();
                model.save().then(function () {
                    this.transitionToRoute("lobby.list");
                }.bind(this));

                //TODO: Associated members of this lobby don't get this lobby removed from their joinedLobbies-array.
                //model.get("members").clear();
            }
        }
    });
});

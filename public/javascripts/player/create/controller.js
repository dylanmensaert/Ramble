define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend({
        actions: {
            create: function () {
                var model = this.get("model");

                //TODO: Uncomment validation if it gets fixed by ember-data
                //TODO: See: https://github.com/dockyard/ember-validations/issues/26
                //model.validate().then(function () {
                //    if (model.get("isValid")) {
                model.save().then(function () {
                    //TODO: this should transition to player profile and automatically log player in
                    this.transitionToRoute("login");
                }.bind(this));
                //    }
                //});
            }
        }
    });
});

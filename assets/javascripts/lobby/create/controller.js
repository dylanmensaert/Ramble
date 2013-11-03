define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        actions: {
            create: function () {
                var model = this.get('model');

                model.validate().then(function () {
                    if (model.get('isValid')) {
                        //TODO: Don't set ID on client-side, server should set it!
                        //model.set('owner', this.get('session.account'));

                        model.save().then(function (model) {
                            this.transitionToRoute('lobby', model);
                        }.bind(this));
                    }
                });
            }
        }
    });
});

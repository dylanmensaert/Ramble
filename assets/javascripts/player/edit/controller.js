define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        actions: {
            save: function() {
                var model = this.get('model');

                model.validate().then(function() {
                    model.save().then(function() {
                        this.transitionToRoute('player', model);
                    }.bind(this));
                }.bind(this));
            }
        }
    });
});

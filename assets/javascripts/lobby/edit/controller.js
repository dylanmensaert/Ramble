define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        actions: {
            save: function() {
                // TODO: Code is very similar to player/edit. Remove duplication?
                var model = this.get('model');

                model.validate().then(function() {
                    if (model.get('isDirty')) {
                        model.save().then(function() {
                            this.transitionToRoute('lobby');
                        }.bind(this));
                    } else {
                        this.transitionToRoute('lobby');
                    }
                }.bind(this));
            }
        }
    });
});

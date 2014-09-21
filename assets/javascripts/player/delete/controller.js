define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        actions: {
            delete: function() {
                var model = this.get('model');

                model.destroyRecord().then(function() {
                    this.send('logout');
                }.bind(this));
            }
        }
    });
});

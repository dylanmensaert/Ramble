define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        moment = require('moment');

    return DS.Transform.extend({
        deserialize: function(serialized) {
            return moment(serialized);
        },
        serialize: function(deserialized) {
            var serializedDate;

            if (deserialized && deserialized.isValid()) {
                serializedDate = deserialized.toISOString();
            }

            return serializedDate;
        }
    });
});

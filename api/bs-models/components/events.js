'use strict';

var Model,
    bluebird = require('bluebird'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    hashPassword;

hashPassword = function(model) {
    return setHashedPassword(model.attributes);
};

module.exports = {
    init: function(model) {
        Model = model;

        Model.on('saving', this.onSaving);
    },
    onSaving: function(model, attributes, options) {
        return bluebird.all([
            hashPassword(model, attributes, options)
        ]);
    }
};

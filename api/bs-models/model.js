/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    Model;

Model = db.Model.extend({
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        delete model.password;

        return model;
    }
});

module.exports = Model;

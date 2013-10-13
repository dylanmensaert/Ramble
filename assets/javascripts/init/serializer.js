/* jshint maxparams: false, nomen: false */
define(function (require) {
    'use strict';

    var DS = require('ember-data');

    return DS.RESTSerializer.extend({
        extractSingle: function (store, type, payload, id, requestType) {
            var wrappedPayload = {};

            wrappedPayload[type.typeKey] = payload;

            return this._super(store, type, wrappedPayload, id, requestType);
        },
        extractArray: function (store, type, payload, id, requestType) {
            var wrappedPayload = {};

            wrappedPayload[type.typeKey] = payload;

            return this._super(store, type, wrappedPayload, id, requestType);
        },
        serializeIntoHash: function (hash, type, record, options) {
            var properties = this.serialize(record, options),
                property;

            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    hash[property] = properties[property];
                }
            }
        }
    });
});

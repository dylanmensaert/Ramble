/*jshint maxparams:4 */
define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        Ember = require('ember'),
        deserializeArray,
        deserializeSingle,
        convertToId,
        convertToIds;

    deserializeArray = function(type, records) {
        records.forEach(function(record) {
            deserializeSingle(type, record);
        });
    };

    deserializeSingle = function(type, record) {
        var relationshipsByName = Ember.get(type, 'relationshipsByName'),
            relationship,
            key,
            property;

        for (property in record) {
            if (record.hasOwnProperty(property) && relationshipsByName.has(property)) {
                relationship = relationshipsByName.get(property);
                key = relationship.type.typeKey.pluralize();

                if (relationship.kind === 'belongsTo') {
                    convertToId(record, property);
                } else if (relationship.kind === 'hasMany') {
                    convertToIds(record[property]);
                }
            }
        }
    };

    convertToId = function(record, property) {
        record[property] = record[property].id;
    };

    convertToIds = function(records) {
        for (var index = records.length - 1; index >= 0; index -= 1) {
            convertToId(records, index);
        }
    };

    return DS.RESTSerializer.extend({
        extractSingle: function(store, type, payload, id) {
            deserializeSingle(type, payload[type.typeKey]);

            return this._super(store, type, payload, id);
        },
        extractFind: function(store, type, payload) {
            deserializeArray(type, payload[type.typeKey.pluralize()]);

            return this._super(store, type, payload);
        },
        extractArray: function(store, type, payload) {
            deserializeArray(type, payload[type.typeKey.pluralize()]);

            return this._super(store, type, payload);
        }
    });
});

/*jshint maxparams:4 */
define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        Ember = require('ember'),
        deserializeArray,
        deserializeSingle,
        deserializeRelationship,
        deserializeBelongsTo,
        deserializeHasMany;

    deserializeArray = function(type, records) {
        records.forEach(function(record) {
            deserializeSingle(type, record);
        });
    };

    deserializeSingle = function(type, record) {
        var relationshipsByName = Ember.get(type, 'relationshipsByName'),
            relationship,
            property;

        for (property in record) {
            if (record.hasOwnProperty(property)) {
                property = property.replace(/Id$/, '');

                if (relationshipsByName.has(property)) {
                    relationship = relationshipsByName.get(property);

                    deserializeRelationship(record, property, relationship);
                }
            }
        }
    };

    deserializeRelationship = function(record, property, relationship) {
        if (relationship.kind === 'belongsTo') {
            deserializeBelongsTo(record, property);
        } else if (relationship.kind === 'hasMany') {
            deserializeHasMany(record[property]);
        }
    };

    deserializeBelongsTo = function(record, property) {
        record[property] = record[property + 'Id'];
        delete record[property + 'Id'];
    };

    deserializeHasMany = function(records) {
        for (var index = records.length - 1; index >= 0; index -= 1) {
            records[index] = records[index].id;
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

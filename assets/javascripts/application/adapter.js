define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        Ember = require('ember');

    return DS.RESTAdapter.extend({
        find: function(store, type, id) {
            var url = this.buildURL(type.typeKey, 'find', id);

            return this.request(url);
        },
        findAll: function(store, type, sinceToken) {
            var query,
                url;

            if (sinceToken) {
                query = {
                    since: sinceToken
                };
            }

            url = this.buildURL(type.typeKey, 'find');

            return this.request(url, query);
        },
        findQuery: function(store, type, query) {
            var url = this.buildURL(type.typeKey, 'find');

            return this.request(url, query);
        },
        findMany: function(store, type, ids) {
            var url,
                data;

            url = this.buildURL(type.typeKey, 'find');
            data = function() {
                this.whereIn('id', ids);
            };

            return this.request(url, data);
        },
        createRecord: function(store, type, record) {
            var data,
                url;

            data = store.serializerFor(type.typeKey).serialize(record);
            url = this.buildURL(type.typeKey, 'create');

            return this.request(url, data);
        },
        updateRecord: function(store, type, record) {
            var data,
                url;

            data = store.serializerFor(type.typeKey).serialize(record);
            url = this.buildURL(type.typeKey, 'update', record.get('id'));

            return this.request(url, data);
        },
        deleteRecord: function(store, type, record) {
            var id,
                url;

            id = record.get('id');
            url = this.buildURL(type.typeKey, 'destroy', id);

            return this.request(url);
        },
        buildURL: function(type, action, id) {
            var host = this.get('host'),
                namespace = this.get('namespace'),
                urlParts,
                url;

            urlParts = [
                host,
                namespace,
                type,
                action,
                id
            ];

            url = urlParts.compact().join('/');

            if (!host) {
                url = '/' + url;
            }

            return url;
        },
        request: function(url, data) {
            var socket,
                json;

            socket = this.get('socket');
            json = {
                url: url,
                data: data
            };

            return new Ember.RSVP.Promise(function(resolve, reject) {
                socket.emit('get', json, function(data) {
                    if (data.status) {
                        Ember.run(null, reject, data);
                    } else {
                        // TODO: handle server's validation-errors? probably just check uniqueness before. other validations are same on client/server
                        Ember.run(null, resolve, data);
                    }
                });
            });
        }
    });
});

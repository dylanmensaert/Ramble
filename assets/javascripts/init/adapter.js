define(function (require) {
    'use strict';

    var DS = require('ember-data'),
        Ember = require('ember');

    return DS.RESTAdapter.extend({
        socket: null,
        find: function (store, type, id) {
            var url = this.buildURL(type.typeKey, 'find', id);

            return this.request(url);
        },
        findAll: function (store, type, sinceToken) {
            var query,
                url,
                hash;

            if (sinceToken) {
                query = {
                    since: sinceToken
                };
            }

            url = this.buildURL(type.typeKey, 'find');
            hash = {
                data: query
            };

            return this.request(url, hash);
        },
        findQuery: function (store, type, query) {
            var url,
                hash;

            url = this.buildURL(type.typeKey, 'find');
            hash = {
                data: query
            };

            return this.request(url, hash);
        },
        createRecord: function (store, type, record) {
            var data,
                url,
                hash;

            data = store.serializerFor(type.typeKey).serialize(record, { includeId: true });
            url = this.buildURL(type.typeKey, 'create');

            hash = {
                data: data
            };

            return this.request(url, hash);
        },
        updateRecord: function (store, type, record) {
            var data,
                id,
                url,
                hash;

            data = store.serializerFor(type.typeKey).serialize(record);
            id = record.get('id');

            url = this.buildURL(type.typeKey, 'update', id);
            hash = {
                data: data
            };

            return this.request(url, hash);
        },
        deleteRecord: function (store, type, record) {
            var id,
                url;

            id = record.get('id');
            url = this.buildURL(type.typeKey, 'destroy', id);

            return this.request(url);
        },
        buildURL: function (type, action, id) {
            var host = this.get('host'),
                namespace = this.get('namespace'),
                urlParts = [],
                url;

            if (host) {
                urlParts.push(host);
            }

            if (namespace) {
                urlParts.push(namespace);
            }

            urlParts.push(this.rootForType(type));
            urlParts.push(action);

            if (id) {
                urlParts.push(id);
            }

            url = urlParts.join('/');

            if (!host) {
                url = '/' + url;
            }

            return url;
        },
        rootForType: function (type) {
            return Ember.String.pluralize(type);
        },
        request: function (url, hash) {
            var socket,
                json;

            socket = this.get('socket');
            json = {
                url: url
            };

            if (hash) {
                json.data = hash.data;
            }

            return new Ember.RSVP.Promise(function (resolve, reject) {
                socket.emit('get', json, function (result) {
                    if (typeof result === 'string') {
                        result = JSON.parse(result);

                        Ember.run(null, resolve, result);
                    } else {
                        Ember.run(null, reject, result);

                        throw new Error(result);
                    }
                });
            });
        }
    });
});

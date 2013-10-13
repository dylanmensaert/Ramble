define(function (require) {
    'use strict';

    var DS = require('ember-data'),
        Ember = require('ember');

    return DS.RESTAdapter.extend({
        socket: null,
        find: function (store, type, id) {
            var url = this.buildURL(type.typeKey, 'find', id);

            return this.request(url, type.typeKey);
        },
        findAll: function (store, type, sinceToken) {
            var query,
                url;

            if (sinceToken) {
                query = {
                    since: sinceToken
                };
            }

            url = this.buildURL(type.typeKey, 'find');

            return this.request(url, this.pluralForType(type.typeKey), query);
        },
        findQuery: function (store, type, query) {
            var url = this.buildURL(type.typeKey, 'find');

            return this.request(url, this.pluralForType(type.typeKey), query);
        },
        createRecord: function (store, type, record) {
            var data,
                url;

            data = store.serializerFor(type.typeKey).serialize(record, { includeId: true });
            url = this.buildURL(type.typeKey, 'create');

            return this.request(url, type.typeKey, data);
        },
        updateRecord: function (store, type, record) {
            var data,
                id,
                url;

            data = store.serializerFor(type.typeKey).serialize(record);
            id = record.get('id');

            url = this.buildURL(type.typeKey, 'update', id);

            return this.request(url, type.typeKey, data);
        },
        deleteRecord: function (store, type, record) {
            var id,
                url;

            id = record.get('id');
            url = this.buildURL(type.typeKey, 'destroy', id);

            return this.request(url, type.typeKey);
        },
        pluralForType: function (type) {
            return Ember.String.pluralize(type);
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

            urlParts.push(this.pluralForType(type));
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
        request: function (url, root, data) {
            var socket,
                json;

            socket = this.get('socket');
            json = {
                url: url,
                data: data
            };

            return new Ember.RSVP.Promise(function (resolve, reject) {
                socket.emit('get', json, function (data) {
                    var result;

                    data = JSON.parse(data);

                    if (data.status) {
                        Ember.run(null, reject, data);

                        throw new Error(JSON.stringify(data));
                    } else {
                        result = {};
                        result[root] = data;

                        Ember.run(null, resolve, result);
                    }
                });
            });
        }
    });
});

define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        isOwnerOfLobby: function () {
            return this.get('session.account') === this.get('owner');
        }.property('session.account', 'owner'),
        isMemberOfLobby: function () {
            //TODO: Use the new 'Ember.computed.filterBy' to improve performance!
            //see: https://github.com/emberjs/ember.js/blob/master/packages/ember-runtime/lib/computed/reduce_computed_macros.js#L256
            return this.get('members').contains(this.get('session.account'));
        }.property('members.@each', 'session.account'),
        actions: {
            join: function () {
                var model,
                    json,
                    socket;

                model = this.get('model');
                json = {
                    url: '/api/membership/join/' + model.get('id')
                };
                socket = this.get('socket');

                if (this.get('session.isLoggedIn')) {
                    socket.emit('get', json, function (data) {
                        if (data.status === 200) {
                            //TODO: show notification?
                            return undefined;
                        }
                    }.bind(this));
                } else {
                    this.transitionToRoute('login');
                }
            },
            leave: function () {
                var model,
                    json,
                    socket;

                model = this.get('model');
                json = {
                    url: '/api/membership/leave/' + model.get('id')
                };
                socket = this.get('socket');

                socket.emit('get', json, function (data) {
                    if (data.status === 200) {
                        //TODO: show notification?
                        return undefined;
                    }
                }.bind(this));
            },
            kick: function (member) {
                var model,
                    json,
                    socket;

                model = this.get('model');
                json = {
                    url: '/api/membership/kick/' + model.get('id'),
                    data: {
                        member: member
                    }
                };
                socket = this.get('socket');

                socket.emit('get', json, function (data) {
                    if (data.status === 200) {
                        //TODO: show notification?
                        return undefined;
                    }
                }.bind(this));
            }
        }
    });
});

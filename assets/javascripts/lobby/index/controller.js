define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        isOwnerOfLobby: function() {
            return this.get('session.account') === this.get('owner');
        }.property('session.account', 'owner'),
        isMemberOfLobby: function() {
            // TODO: Use the new 'Ember.computed.filterBy' to improve performance!
            // see: https://github.com/emberjs/ember.js/blob/master/packages/ember-runtime/lib/computed/reduce_computed_macros.js#L256
            return this.get('members').contains(this.get('session.account'));
        }.property('members.@each', 'session.account'),
        actions: {
            join: function() {
                var json = {
                    url: '/api/membership/join/' + this.get('model.id')
                };

                if (this.get('session.isLoggedIn')) {
                    this.get('socket').emit('get', json, function(data) {
                        if (data.status === 200) {
                            // TODO: show notification?
                            // TODO: Update data in ember-data store? or via websockets?
                            return undefined;
                        }
                    }.bind(this));
                } else {
                    this.transitionToRoute('login');
                }
            },
            leave: function() {
                var json = {
                    url: '/api/membership/leave/' + this.get('model.id')
                };

                this.get('socket').emit('get', json, function(data) {
                    if (data.status === 200) {
                        // TODO: show notification?
                        return undefined;
                    }
                }.bind(this));
            },
            kick: function(player) {
                var json = {
                    url: '/api/membership/kick/' + this.get('model.id'),
                    data: {
                        player: player
                    }
                };

                this.get('socket').emit('get', json, function(data) {
                    if (data.status === 200) {
                        // TODO: show notification?
                        return undefined;
                    }
                }.bind(this));
            }
        }
    });
});

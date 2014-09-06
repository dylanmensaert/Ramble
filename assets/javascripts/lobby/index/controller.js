define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        isOwnerOfLobby: function() {
            var account = this.get('session.account'),
                player = this.get('ownership.player');

            return account && account === player;
        }.property('session.account', 'ownership.player'),
        isMemberOfLobby: Ember.computed.filter('memberships', function(membership) {
            return this.get('session.account') === membership.get('player');
        }),
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

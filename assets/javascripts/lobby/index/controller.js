define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        userMembership: function() {
            var user = this.get('session.user'),
                lobbyId = this.get('model.id'),
                userMembership;

            if (user) {
                userMembership = user.get('ownerships').filterBy('lobby.id', lobbyId);

                if (Ember.isEmpty(userMembership)) {
                    userMembership = user.get('memberships').filterBy('lobby.id', lobbyId);
                }
            }

            return userMembership;
        }.property('model.id', 'session.user'),
        isOwnerOfLobby: function() {
            var type = this.get('userMembership.type');

            return type === 'owner';
        }.property('userMembership.type'),
        isMemberOfLobby: function() {
            var type = this.get('userMembership.type');

            return type === 'member';
        }.property('userMembership.type'),
        actions: {
            join: function() {
                var json = {
                    url: '/api/memberships/create',
                    data: {
                        lobbyId: this.get('model.id')
                    }
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
                    url: '/api/memberships/destroy/' + this.get('userMembership.id')
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
                    url: '/api/memberships/destroy/' + this.get('userMembership.id'),
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

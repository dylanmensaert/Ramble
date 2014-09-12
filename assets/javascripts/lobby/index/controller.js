define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        accountMembership: function() {
            var account = this.get('session.account'),
                lobbyId = this.get('model.id'),
                accountMembership;

            if (account) {
                accountMembership = account.get('ownerships').filterBy('lobby.id', lobbyId);

                if (Ember.isEmpty(accountMembership)) {
                    accountMembership = account.get('memberships').filterBy('lobby.id', lobbyId);
                }
            }

            return accountMembership;
        }.property('model.id', 'session.account'),
        isOwnerOfLobby: function() {
            var type = this.get('accountMembership.type');

            return type === 'owner';
        }.property('accountMembership.type'),
        isMemberOfLobby: function() {
            var type = this.get('accountMembership.type');

            return type === 'member';
        }.property('accountMembership.type'),
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
                    url: '/api/memberships/destroy/' + this.get('accountMembership.id')
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
                    url: '/api/memberships/destroy/' + this.get('accountMembership.id'),
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

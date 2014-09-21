define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        membershipOfUser: function() {
            var user = this.get('session.user'),
                lobbyId = this.get('model.id'),
                membershipOfUser;

            if (user) {
                membershipOfUser = user.get('memberships').findBy('data.lobby.id', lobbyId);
            }

            return membershipOfUser;
        }.property('model.id', 'session.user.memberships.@each.lobby.id'),
        isHost: function() {
            var type = this.get('membershipOfUser.type');

            return type === 'host';
        }.property('membershipOfUser.type'),
        actions: {
            join: function() {
                // TODO: Handle isLoggedIn on server and response via adapter?
                if (this.get('session.isLoggedIn')) {
                    this.get('store').createRecord('membership', {
                        lobby: this.get('model')
                    }).save();
                } else {
                    this.transitionToRoute('login');
                }
            },
            leave: function() {
                this.get('membershipOfUser').destroyRecord();
            },
            kick: function(membership) {
                membership.destroyRecord();
            }
        }
    });
});

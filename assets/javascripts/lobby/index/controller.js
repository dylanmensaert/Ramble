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
            leave: function () {
                this.send('kick', this.get('session.account'));
            },
            kick: function (member) {
                var model = this.get('model');

                model.get('members').removeObject(member);
                model.save();
            },
            join: function () {
                var model = this.get('model');

                //TODO: Check if password is correct on server!
                if (this.get('session.isLoggedIn')) {
                    model.get('members').pushObject(this.get('session.account'));
                    model.save();
                } else {
                    this.transitionToRoute('login');
                }
            }
        }
    });
});

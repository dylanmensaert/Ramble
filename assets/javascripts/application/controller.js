define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Controller.extend({
        needs: ['login'],
        actions: {
            logout: function () {
                this.get('controllers.login').send('logout');
            }
        }
    });
});

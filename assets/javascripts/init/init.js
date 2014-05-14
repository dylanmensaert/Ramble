define(function(require) {
    'use strict';

    require('init/templates');
    require('init/presentation');
    require('init/router');

    require('application/init');
    require('index/init');
    require('login/init');
    require('player/init');
    require('lobby/init');

    var App = require('init/app'),
        DS = require('ember-data');

    //TODO: Hack to fix this issue: https://github.com/dockyard/ember-validations/issues/26
    //https://github.com/emberjs/data/blob/2326a1c8610e57396aa4e79e85884f4039a382ea/packages/ember-data/lib/system/model/model.js#L10-L12
    DS.Model.reopen({
        isValid: function() {
            return this.get('currentState.isValid');
        }.property('currentState.isValid')
    });

    App.advanceReadiness();
});

define(function(require) {
    'use strict';

    var App = require('init/app');

    App.Membership = require('membership/model');

    App.MembershipRoute = require('membership/route');
    App.MembershipController = require('membership/controller');

    App.MembershipIndexRoute = require('membership/index/route');
    App.MembershipIndexController = require('membership/index/controller');

    App.MembershipListRoute = require('membership/list/route');
    App.MembershipListController = require('membership/list/controller');
});

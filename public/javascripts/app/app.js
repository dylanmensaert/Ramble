define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        DS = require("EmberData"),
        $ = require("jQuery"),
        App;

    App = Ember.Application.create({
        ready : function () {
            $(".my-initial-loading").remove();
        },
        LOG_TRANSITIONS : true
    });

    App.deferReadiness();

    App.Store = DS.Store.extend({
        adapter : DS.FixtureAdapter.create()
    });

    return App;
});

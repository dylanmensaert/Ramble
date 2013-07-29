define([
    "Ember", "EmberData", "jQuery"
], function (Ember, DS, $) {
    "use strict";

    var App = Ember.Application.create({
        LOG_TRANSITIONS : true,
        ready : function () {
            $(".my-initial-loading").remove();
        }
    });

    App.deferReadiness();

    //TODO: Move all App.xxxProperty to closure (App.create)
    App.Store = DS.Store.extend({
        adapter : DS.FixtureAdapter.create()
    });

    return App;
});

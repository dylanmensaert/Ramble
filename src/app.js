define([
    "Ember", "EmberData"
], function (Ember, DS) {
    "use strict";

    var App = Ember.Application.create({
        LOG_TRANSITIONS : true,
        ready : function () {
            Ember.$("#initialLoading").remove();
        }
    });

    App.deferReadiness();

    App.Store = DS.Store.extend({
        adapter : "DS.FixtureAdapter"
    });

    return App;
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Controller.extend({
        documentTitle : "Application",
        isLeaf : false,
        needs : "login",
        init : function () {
            this._super();

            var self = this;

            Ember.$(document).ajaxStart(function () {
                self.incrementProperty("amountOfLoaders");
            });

            Ember.$(document).ajaxStop(function () {
                self.decrementProperty("amountOfLoaders");
            });
        },
        amountOfLoaders : 0,
        isLoading : Ember.computed(function () {
            return this.get("amountOfLoaders") > 0;
        }).property("amountOfLoaders")
    });
});

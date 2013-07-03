define([
    "Ember", "App", "GoogleAnalytics"
], function (Ember, App, GoogleAnalytics) {
    "use strict";

    return {
        initialize : function () {
            var applicationTitle = document.title;

            Ember.Location.registerImplementation("hashbang", Ember.HashLocation.extend({
                getURL : function () {
                    return this.get("location").hash.substr(2);
                },
                setURL : function (path) {
                    this.get("location").hash = "!" + path;
                    this.set("lastSetURL", "!" + path);
                },
                onUpdateURL : function (callback) {
                    var self, guid;

                    self = this;
                    guid = Ember.guidFor(this);

                    Ember.$(window).bind("hashchange.ember-location-" + guid, function () {
                        Ember.run(function () {
                            var path = location.hash.substr(2);

                            if (self.get("lastSetURL") !== path) {
                                self.set("lastSetURL", null);

                                callback(path);
                            }
                        });
                    });
                },
                formatURL : function (url) {
                    return '#!' + url;
                }
            }));

            App.Router.reopen({
                location : "hashbang"
            });

            GoogleAnalytics.push(["_setAccount", App.config.googleAnalyticsAccount]);

            Ember.Route.reopen({
                setupController : function (controller, model) {
                    this._super(controller, model);

                    if (this.get("isLeaf")) {
                        document.title = applicationTitle + this.get("title");

                        GoogleAnalytics.push(["_trackPageview", this.get("title")]);
                    }
                }
            });

            App.Router.map(function () {
                this.resource("videos");
                this.resource("video",
                    {
                        path : "/video/:video_id"
                    },
                    function () {
                        this.route("play");
                    });
            });
        }
    };
});
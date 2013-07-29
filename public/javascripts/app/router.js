/* jshint nomen: false, browser: true */
define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        App = require("App"),
        GoogleAnalytics = require("GoogleAnalytics"),
        config = require("app/config");

    return {
        initialize : function () {
            var applicationTitle = document.title.replace("loading", "");

            GoogleAnalytics.push(["_setAccount", config.googleAnalyticsAccount]);

            Ember.Route.reopen({
                setupController : function (controller, model) {
                    this._super(controller, model);

                    if (controller.get("isLeaf")) {
                        document.title = applicationTitle + controller.get("documentTitle");

                        GoogleAnalytics.push(["_trackPageview", controller.get("documentTitle")]);
                    }
                }
            });

            App.Router.map(function () {
                this.resource("login");

                this.resource("lobby", function () {
                    this.route("index",
                        {
                            path : ":lobby_id"
                        });
                    this.route("edit",
                        {
                            path : ":lobby_id/edit"
                        });
                    this.route("delete",
                        {
                            path : ":lobby_id/delete"
                        });
                    this.route("list");
                    this.route("create");
                });

                this.resource("player", function () {
                    this.route("index",
                        {
                            path : ":player_id"
                        });
                    this.route("edit",
                        {
                            path : ":player_id/edit"
                        });
                    this.route("delete",
                        {
                            path : ":player_id/delete"
                        });
                    this.route("list");
                    this.route("create");
                });
            });
        }
    };
});

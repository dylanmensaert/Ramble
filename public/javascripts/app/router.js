/* jshint nomen: false, browser: true */
define(function (require) {
    "use strict";

    var Ember = require("ember"),
        App = require("App"),
        googleAnalytics = require("google-analytics"),
        config = require("app/config"),
    //TODO: Put document.title in config.json? Or better, use the built-in features of the new router, see: https://github.com/emberjs/ember.js/pull/2757.
        applicationTitle = document.title.replace("loading", "");

    return {
        initialize: function () {
            googleAnalytics("create", config.googleAnalyticsAccount);

            Ember.Route.reopen({
                setupController: function (controller, model) {
                    this._super(controller, model);

                    if (controller.get("isLeaf")) {
                        document.title = applicationTitle + controller.get("documentTitle");

                        googleAnalytics("send", "pageview", {
                            title: controller.get("documentTitle")
                        });
                    }
                }
            });

            App.Router.map(function () {
                this.resource("login");

                this.resource("lobby", function () {
                    this.route("index",
                        {
                            path: ":lobby_id"
                        });
                    this.route("edit",
                        {
                            path: ":lobby_id/edit"
                        });
                    this.route("delete",
                        {
                            path: ":lobby_id/delete"
                        });
                    this.route("list");
                    this.route("create");
                });

                this.resource("player", function () {
                    this.route("index",
                        {
                            path: ":player_id"
                        });
                    this.route("edit",
                        {
                            path: ":player_id/edit"
                        });
                    this.route("delete",
                        {
                            path: ":player_id/delete"
                        });
                    this.route("list");
                    this.route("create");
                });
            });
        }
    };
});

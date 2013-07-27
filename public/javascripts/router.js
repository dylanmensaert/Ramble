/* jshint browser: true */
define([
    "Ember", "App", "GoogleAnalytics"
], function (Ember, App, GoogleAnalytics) {
    "use strict";

    return {
        initialize : function () {
            var applicationTitle = document.title;

            applicationTitle = applicationTitle.replace("loading", "");

            GoogleAnalytics.push(["_setAccount", App.config.googleAnalyticsAccount]);

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

                this.resource("lobby",
                    {
                        path : "lobby"
                    }, function () {
                        this.route("index",
                            {
                                path : ":lobby_id"
                            });
                        this.route("create",
                            {
                                path : "create"
                            });
                        this.route("edit",
                            {
                                path : ":lobby_id/edit"
                            });
                        this.route("delete",
                            {
                                path : ":lobby_id/delete"
                            });
                        this.route("list",
                            {
                                path : "list"
                            });
                    });

                this.resource("player",
                    {
                        path : "player"
                    }, function () {
                        this.route("index",
                            {
                                path : ":player_id"
                            });
                        this.route("create",
                            {
                                path : "create"
                            });
                        this.route("edit",
                            {
                                path : ":player_id/edit"
                            });
                        this.route("delete",
                            {
                                path : ":player_id/delete"
                            });
                        this.route("list",
                            {
                                path : "list"
                            });
                    });

            });
        }
    };
});

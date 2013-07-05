define([
    "Ember", "App", "GoogleAnalytics"
], function (Ember, App, GoogleAnalytics) {
    "use strict";

    return {
        initialize : function () {
            var applicationTitle = document.title.replace("loading", "");

            GoogleAnalytics.push(["_setAccount", App.config.googleAnalyticsAccount]);

            Ember.Route.reopen({
                setupController : function (controller, model) {
                    this._super(controller, model);

                    if (controller.get("isLeaf")) {
                        document.title = applicationTitle + controller.get("documentTitle");

                        GoogleAnalytics.push(["_trackPageview", this.get("documentTitle")]);
                    }
                }
            });

            App.Router.map(function () {
                this.resource("lobbies", function () {
                    this.resource("lobby",
                        {
                            path : "/:lobby_id"
                        }, function () {
                            this.route("edit");
                            this.route("remove");
                        });
                    this.route("add");
                });
            });
        }
    };
});
define([
    "App", "index/main/route", "index/main/controller", "index/main/view"
], function (App, IndexRoute, IndexController, IndexView) {
    "use strict";

    return {
        initialize : function () {
            App.IndexRoute = IndexRoute;
            App.IndexController = IndexController;
            App.IndexView = IndexView;
        }
    };
});

define([
    "App", "Index/route", "Index/controller", "Index/view"
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

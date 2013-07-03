define([
    "App", "IndexRoute", "IndexController", "IndexView"
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

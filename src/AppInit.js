define([
    "App", "text!config.json", "text!data.json", "RouterInit", "ApplicationInit", "IndexInit", "VideoInit"
], function (App, config, data, RouterInit, ApplicationInit, IndexInit, VideoInit) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            RouterInit.initialize();
            ApplicationInit.initialize();
            IndexInit.initialize();
            VideoInit.initialize();

            App.advanceReadiness();
        }
    };
});

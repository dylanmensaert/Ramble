define([
    "App", "Video", "VideoRoute", "VideoController", "VideoView", "VideoPlayRoute", "VideoPlayController", "VideoPlayView", "VideosRoute", "VideosController", "VideosView"
], function (App, Video, VideoRoute, VideoController, VideoView, VideoPlayRoute, VideoPlayController, VideoPlayView, VideosRoute, VideosController, VideosView) {
    "use strict";

    return {
        initialize : function () {
            App.Video = Video;

            App.Video.FIXTURES = App.data.videos;

            App.VideoRoute = VideoRoute;
            App.VideoController = VideoController;
            App.VideoView = VideoView;

            App.VideoPlayRoute = VideoPlayRoute;
            App.VideoPlayController = VideoPlayController;
            App.VideoPlayView = VideoPlayView;

            App.VideosRoute = VideosRoute;
            App.VideosController = VideosController;
            App.VideosView = VideosView;
        }
    };
});

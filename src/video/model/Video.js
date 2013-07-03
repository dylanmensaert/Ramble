define([
    "EmberData"
], function (DS) {
    "use strict";

    return DS.Model.extend({
        title : DS.attr("string"),
        author : DS.attr("string"),
        videoUrl : DS.attr("string"),
        thumbnailUrl : DS.attr("string")
    });
});

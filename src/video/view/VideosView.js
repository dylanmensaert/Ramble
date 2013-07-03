define([
    "Ember", "text!VideoTemplate/Videos.handlebars", "VideoItemView"
], function (Ember, template, VideoItemView) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        videoItemViewClass : VideoItemView
    });
});

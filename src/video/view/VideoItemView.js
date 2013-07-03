define([
    "Ember", "text!VideoTemplate/VideoItem.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        template : Ember.Handlebars.compile(template),
        tagName : "li",
        classNames : ["videoItem"]
    });
});

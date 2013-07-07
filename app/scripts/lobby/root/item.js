define([
    "Ember", "text!lobby/root/item.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        //TODO: tagName via View.extend?
        tagName : "li"
    });
});

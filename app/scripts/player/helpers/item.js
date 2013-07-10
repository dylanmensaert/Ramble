define([
    "Ember", "text!player/helpers/item.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        classNames : ["accordion-group"],
        targetItemId : Ember.computed(function () {
            return "#" + this.get("itemId");
        }).property("itemId"),
        itemId : Ember.computed(function () {
            return this.get("itemIdName") + this.get("content.id");
        }).property("itemIdName", "content.id")
    });
});

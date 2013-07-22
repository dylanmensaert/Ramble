define([
    "Ember", "hbs!index/root/template.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : template
    });
});

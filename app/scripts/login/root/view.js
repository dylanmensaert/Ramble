define([
    "Ember", "text!login/root/template.handlebars"
], function (Ember, template) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        LoginTextField : Ember.TextField.extend({
            insertNewline : function () {
                this.get("controller").send("login");
            }
        })
    });
});

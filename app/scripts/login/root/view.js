define([
    "Ember", "text!login/root/template.handlebars", "application/helpers/output"
], function (Ember, template, output) {
    "use strict";

    return Ember.View.extend({
        defaultTemplate : Ember.Handlebars.compile(template),
        LoginTextField : Ember.TextField.extend({
            insertNewline : function () {
                this.get("controller").send("login");
            }
        }),
        output : output
    });
});

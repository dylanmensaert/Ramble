define([
    "Handlebars", "Ember"
], function (Handlebars, Ember) {
    "use strict";

    return {
        load : function (name, parentRequire, onload, config) {
            parentRequire([("text!" + name)],
                function (templateText) {
                    var template = Ember.Handlebars.compile(templateText);

                    onload(template);
                }
            );
        }
    }
});

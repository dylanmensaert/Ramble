define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Controller.extend({
        documentTitle: "Application",
        isLeaf: false,
        needs: ["login"],
        actions: {
            logout: function () {
                this.get("controllers.login").send("logout");
            }
        }
    });
});

define(function (require) {
    "use strict";

    var DS = require("EmberData"),
        EmberValidations = require("EmberValidations");

    return DS.Model.extend(EmberValidations.Mixin, {
        title : DS.attr("string"),
        password : DS.attr("string"),
        maxMembers : DS.attr("number"),
        //TODO: Update validations
        validations : {
            title : {
                presence : true,
                length : {
                    maximum : 50
                }
            },
            password : {
                presence : true,
                length : {
                    maximum : 50
                },
                confirmation : true
            },
            maxMembers : {
                presence : true,
                numericality : true
            },
            owner : {
                presence : true
            },
            members : {

            }
        }
    });
});

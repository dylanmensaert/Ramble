define(function (require) {
    "use strict";

    var DS = require("EmberData"),
        EmberValidations = require("EmberValidations");

    return DS.Model.extend(EmberValidations.Mixin, {
        username: DS.attr("string"),
        password: DS.attr("string"),
        email: DS.attr("string"),
        //TODO: Update validations
        validations: {
            username: {
                presence: true,
                length: {
                    maximum: 50
                }
            },
            password: {
                presence: true,
                length: {
                    maximum: 50
                },
                confirmation: true
            },
            email: {
                presence: true,
                length: {
                    maximum: 50
                },
                format: {
                    with: /\S+@\S+\.\S+/
                }
            },
            ownedLobbies: {

            },
            joinedLobbies: {

            }
        }
    });
});

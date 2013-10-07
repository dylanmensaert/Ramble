define(function (require) {
    "use strict";

    var DS = require("ember-data")/*,
     EmberValidations = require("ember-validations")*/;

    return DS.Model.extend(/*EmberValidations.Mixin, */{
        username: DS.attr("string"),
        password: DS.attr("string"),
        email: DS.attr("string"),
        ownedLobbies: DS.hasMany("lobby", {
            inverse: "owner",
            async: true
        }),
        joinedLobbies: DS.hasMany("lobby", {
            inverse: "members",
            async: true
        }),
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
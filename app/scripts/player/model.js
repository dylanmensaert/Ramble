define([
    "EmberData", "Ember"
], function (DS, Ember) {
    "use strict";

    return DS.Model.extend(Ember.Validations.Mixin, {
        username : DS.attr("string"),
        password : DS.attr("string"),
        email : DS.attr("string"),
        ownedLobbies : DS.hasMany("App.Lobby", {
            inverse : "owner"
        }),
        joinedLobbies : DS.hasMany("App.Lobby", {
            inverse : "members"
        }),
        //TODO: Update validations
        validations : {
            username : {
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
                confirmation : {
                    message : "has to match password confirmation"
                }
            },
            email : {
                presence : true,
                length : {
                    maximum : 50
                },
                format : {
                    "with" : /\S+@\S+\.\S+/,
                    message : "invalid email"
                }
            },
            ownedLobbies : {

            },
            joinedLobbies : {

            }
        }
    });
});

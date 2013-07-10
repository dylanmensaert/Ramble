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
            inverse : "players"
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
                confirmation : true
            },
            email : {
                presence : true,
                length : {
                    maximum : 50
                },
                format : {
                    "with" : /.+\@.+\..+/,
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

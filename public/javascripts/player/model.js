define([
    "EmberData", "EmberValidations", "App"
], function (DS, EmberValidations, App) {
    "use strict";

    window.App = App;

    return DS.Model.extend(EmberValidations.Mixin, {
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
                confirmation : true
            },
            email : {
                presence : true,
                length : {
                    maximum : 50
                },
                format : {
                    with : /\S+@\S+\.\S+/
                }
            },
            ownedLobbies : {

            },
            joinedLobbies : {

            }
        }
    });
});

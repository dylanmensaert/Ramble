define([
    "EmberData", "EmberValidations"
], function (DS, EmberValidations) {
    "use strict";

    return DS.Model.extend(EmberValidations.Mixin, {
        title : DS.attr("string"),
        password : DS.attr("string"),
        maxMembers : DS.attr("number"),
        owner : DS.belongsTo("App.Player", {
            inverse : "ownedLobbies"
        }),
        members : DS.hasMany("App.Player", {
            inverse : "joinedLobbies"
        }),
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

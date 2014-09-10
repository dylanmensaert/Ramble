'use strict';

var Membership = require('../orm/membership/model'),
    Memberships = require('../orm/membership/collection');

module.exports = {
    find: function(request, response) {
        var id = request.param('id'),
            ids = request.param('ids');

        if (id) {
            Membership.forge({
                id: id
            }).fetchWithRelated().then(function(membership) {
                response.send({
                    membership: membership
                });
                // Membership.subscribe(request.socket, membership);
            });
        } else if (ids) {
            Memberships.forge().findMany(ids).then(function(memberships) {
                response.send({
                    memberships: memberships
                });
                // Membership.subscribe(request.socket);
                // Membership.subscribe(request.socket, memberships);
            });
        } else {
            Memberships.forge().findQuery(request.params.all()).then(function(memberships) {
                response.send({
                    memberships: memberships
                });
                // Membership.subscribe(request.socket);
                // Membership.subscribe(request.socket, memberships);
            });
        }
    },
    create: function(request, response) {
        var values = {
            lobbyId: request.param('id'),
            playerId: request.user.id,
            type: 'member'
        };

        // TODO: Check the password!
        Membership.forge(values).save().then(function(membership) {
            response.send({
                membership: membership
            });
        });
    },
    update: function(request, response) {
        var values = {
                id: request.param('id'),
                type: request.param('type')
            },
            membership = Membership.forge(values);

        membership.save().then(function(membership) {
            response.send({
                membership: membership
            });
            // Membership.publishUpdate(membership.id, membership.toJSON());
        });
    },
    destroy: function(request, response) {
        var id = request.param('id');

        Membership.forge({
            id: id
        }).destroy().then(function() {
            response.send({
                membership: {
                    id: id
                }
            });
            // Membership.publishDestroy(membership.id);
        });
    }
};

// TODO: Remove code when actions have been implemented correctly through normal CRUD

// join: function(request, response) {
//     var values = {
//         lobbyId: request.param('id'),
//         playerId: request.user.id
//     };

//     // TODO: Check the password!
//     Membership.forge(values).save().then(function(lobby) {
//         response.send({
//             lobby: lobby
//         });
//     });
// },
// leave: function(request, response) {
//     var values = {
//         lobbyId: request.param('id'),
//         playerId: request.user.id
//     };

//     deleteMembership(values, response);
// },
// kick: function(request, response) {
//     var values = {
//         lobbyId: request.param('id'),
//         playerId: request.param('player').id
//     };

//     deleteMembership(values, response);
// }

// deleteMembership = function(values, response) {
//     // TODO: Can be shorter? : Membership.forge(values).destroy().then(function () {
//     Membership.forge().query().where(values).del().then(function() {
//         response.send({
//             // TODO: Look into what to send to client
//             lobby: {
//                 id: values.lobbyId
//             }
//         });
//     });
// };

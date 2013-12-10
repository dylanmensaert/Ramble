/* jshint camelcase:false */
'use strict';

var Bookshelf = require('../bs-models/bookshelf'),
    Membership = require('../bs-models/membership'),
    Memberships = Bookshelf.Collection.extend({model: Membership}),
    relations = ['player_id', 'lobby_id'],
    findMany = function (request, response) {
        var ids = request.param('ids'),
            queryParams = request.params.all(),
            membershipCollection = Memberships.forge(),
            promise = membershipCollection.query();

        //TODO: Implement limit skip sort.
        if (ids) {
            promise = promise.whereIn(ids);
        } else {
            promise = promise.where(queryParams);
        }

        promise.then(function (memberships) {
            membershipCollection.add(memberships);

            return membershipCollection.load(relations);
        }).then(function (memberships) {
                response.send({
                    memberships: memberships
                });

                //TODO: Check in sails-code what subscribe/publish exactly
                //Membership.subscribe(request.socket);
                //Membership.subscribe(request.socket, memberships);
            });
    };

module.exports = {
    find: function (request, response) {
        var id = request.param('id');

        if (id) {
            //TODO: Implement relationships correctly
            Membership.forge({id: id}).fetch({withRelated: relations}).then(function (membership) {
                response.send({
                    membership: membership
                });

                //Membership.subscribe(request.socket, membership);
            });
        } else {
            findMany(request, response);
        }
    },
    create: function (request, response) {
        //TODO; Refactor syntax without using extra variable
        var values = {
                lobby_id: request.param('lobby_id'),
                player_id: request.param('player_id')
            },
            membership = Membership.forge(values);

        membership.hashPassword().then(function () {
            return membership.save();
        }).then(function (membership) {
                response.send({
                    membership: membership
                });
            });
    },
    update: function (request, response) {
        var values = {
                lobby_id: request.param('lobby_id'),
                player_id: request.param('player_id')
            },
            membership = Membership.forge(values);

        membership.hashPassword().then(function () {
            return membership.save();
        }).then(function (membership) {
                response.send({
                    membership: membership
                });

                //Membership.publishUpdate(membership.id, membership.toJSON());
            });
    },
    destroy: function (request, response) {
        var lobby_id = request.param('id'),
            player_id = request.param('member').id;

        Membership.forge().query().where({lobby_id: lobby_id, player_id: player_id}).del().then(function () {
            response.send({
                membership: {
                    lobby_id: lobby_id,
                    player_id: player_id
                }
            });

            //Membership.publishDestroy(membership.id);
        });
    }
};

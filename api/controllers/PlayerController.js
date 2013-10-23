'use strict';

/**
 * PlayerController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */
module.exports = {
    find: function (request, response) {
        var id,
            where,
            options,
            modelValues;

        id = request.param('id');

        if (id) {
            Player.findOne(id).done(function (error, player) {
                if (error) {
                    response.send(error);
                } else if (!player) {
                    response.notFound();
                } else {
                    response.send({
                        player: player
                    });
                }
            });
        } else {
            where = request.params.all();

            delete where.limit;
            delete where.skip;
            delete where.sort;

            options = {
                limit: request.param('limit'),
                skip: request.param('skip'),
                sort: request.param('sort'),
                where: where
            };

            Player.find(options).done(function afterFound(error, players) {
                if (error) {
                    response.send(error);
                } else if (!players) {
                    response.notFound();
                } else {
                    if (sails.config.hooks.pubsub && !Player.silent) {
                        Player.subscribe(request.socket);

                        Player.subscribe(request.socket, players);
                    }

                    modelValues = [];

                    players.forEach(function (player) {
                        modelValues.push(player.toJSON());
                    });
                    response.send({
                        players: modelValues
                    });
                }
            });
        }
    },
    create: function (request, response) {
        var params = request.params.all();

        Player.create(params, function (error, player) {
            if (error) {
                response.send(error);
            } else {
                response.send({
                    player: player
                });

                Player.publishCreate(player.toJSON());
            }
        });
    },
    update: function (request, response) {
        var params,
            id;

        params = request.params.all();
        id = params.id;

        if (!id) {
            response.send({
                status: 404,
                message: 'Invalid player Id.'
            });
        } else {
            Player.findOne(id).done(function (error, player) {
                if (error) {
                    response.send(error);
                } else if (!player) {
                    response.notFound();
                } else {
                    Player.update(id, params, function (error, player) {
                        if (error) {
                            response.send(error);
                        } else {
                            response.send({
                                player: player
                            });

                            Player.publishUpdate(player.id, player.toJSON());
                        }
                    });
                }
            });
        }
    },
    destroy: function (request, response) {
        var id = request.param('id');

        if (!id) {
            response.send({
                status: 404,
                message: 'Invalid player Id.'
            });
        } else {
            Player.findOne(id).done(function (error, player) {
                if (error) {
                    response.send(error);
                } else if (!player) {
                    response.notFound();
                } else {
                    Player.destroy(id, function (error) {
                        if (error) {
                            response.send(error);
                        } else {
                            response.send({
                                player: player
                            });

                            Player.publishDestroy(player.id);
                        }
                    });
                }
            });
        }
    }
};

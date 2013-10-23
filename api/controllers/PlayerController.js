'use strict';

module.exports = {
    find: function (request, response) {
        var id,
            where,
            options,
            playerValues;

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

                    playerValues = [];

                    players.forEach(function (player) {
                        playerValues.push(player.toJSON());
                    });

                    response.send({
                        players: playerValues
                    });
                }
            });
        }
    },
    create: function (request, response) {
        var allParams = request.params.all();

        Player.create(allParams, function (error, player) {
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
        var allParams,
            id;

        allParams = request.params.all();
        id = allParams.id;

        if (!id) {
            response.send({
                status: 403,
                message: 'No id provided.'
            });
        } else {
            Player.findOne(id).done(function (error, player) {
                if (error) {
                    response.send(error);
                } else if (!player) {
                    response.notFound();
                } else {
                    Player.update(id, allParams, function (error, player) {
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
                status: 403,
                message: 'No id provided.'
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

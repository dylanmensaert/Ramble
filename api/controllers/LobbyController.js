'use strict';

/**
 * LobbyController
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
            Lobby.findOne(id).done(function (error, lobby) {
                if (error) {
                    response.send(error);
                } else if (!lobby) {
                    response.notFound();
                } else {
                    response.send({
                        lobby: lobby
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

            Lobby.find(options).done(function afterFound(error, lobbies) {
                if (error) {
                    response.send(error);
                } else if (!lobbies) {
                    response.notFound();
                } else {
                    if (sails.config.hooks.pubsub && !Lobby.silent) {
                        Lobby.subscribe(request.socket);

                        Lobby.subscribe(request.socket, lobbies);
                    }

                    modelValues = [];

                    lobbies.forEach(function (lobby) {
                        modelValues.push(lobby.toJSON());
                    });
                    response.send({
                        lobbies: modelValues
                    });
                }
            });
        }
    },
    create: function (request, response) {
        var params = request.params.all();

        Lobby.create(params, function (error, lobby) {
            if (error) {
                response.send(error);
            } else {
                response.send({
                    lobby: lobby
                });

                Lobby.publishCreate(lobby.toJSON());
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
                message: 'Invalid lobby Id.'
            });
        } else {
            Lobby.findOne(id).done(function (error, lobby) {
                if (error) {
                    response.send(error);
                } else if (!lobby) {
                    response.notFound();
                } else {
                    Lobby.update(id, params, function (error, lobby) {
                        if (error) {
                            response.send(error);
                        } else {
                            response.send({
                                lobby: lobby
                            });

                            Lobby.publishUpdate(lobby.id, lobby.toJSON());
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
                message: 'Invalid lobby Id.'
            });
        } else {
            Lobby.findOne(id).done(function (error, lobby) {
                if (error) {
                    response.send(error);
                } else if (!lobby) {
                    response.notFound();
                } else {
                    Lobby.destroy(id, function (error) {
                        if (error) {
                            response.send(error);
                        } else {
                            response.send({
                                lobby: lobby
                            });

                            Lobby.publishDestroy(lobby.id);
                        }
                    });
                }
            });
        }
    }
};

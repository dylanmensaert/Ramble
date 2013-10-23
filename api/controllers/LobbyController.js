'use strict';

module.exports = {
    find: function (request, response) {
        var id,
            where,
            options,
            lobbyValues;

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

            Lobby.find(options).done(function (error, lobbies) {
                if (error) {
                    response.send(error);
                } else if (!lobbies) {
                    response.notFound();
                } else {
                    if (sails.config.hooks.pubsub && !Lobby.silent) {
                        Lobby.subscribe(request.socket);

                        Lobby.subscribe(request.socket, lobbies);
                    }

                    lobbyValues = [];

                    lobbies.forEach(function (lobby) {
                        lobbyValues.push(lobby.toJSON());
                    });

                    response.send({
                        lobbies: lobbyValues
                    });
                }
            });
        }
    },
    create: function (request, response) {
        var allParams = request.params.all();

        Lobby.create(allParams, function (error, lobby) {
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
            Lobby.findOne(id).done(function (error, lobby) {
                if (error) {
                    response.send(error);
                } else if (!lobby) {
                    response.notFound();
                } else {
                    Lobby.update(id, allParams, function (error, lobby) {
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

        //TODO: Should we really check if ID exists?
        if (!id) {
            response.send({
                status: 403,
                message: 'No id provided.'
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

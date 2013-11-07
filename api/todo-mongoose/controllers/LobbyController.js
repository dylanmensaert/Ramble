'use strict';


//TODO: jsHint error: redefinition of Lobby
//var mongoose = require('mongoose'),
//Lobby = mongoose.model('Lobby'),
var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater'),
    references = [
        {
            path: 'owner'
        },
        {
            path: 'members'
        }
    ],
    populateModel = function (model, response, success) {
        Lobby.populate(model, references, function (error, populatedModel) {
            if (error) {
                response.error(error);
            } else {
                success(populatedModel);
            }
        });
    };

module.exports = {
    find: function (request, response) {
        var options,
            lobbiesResult;

        options = createOptions(request, response, Lobby);

        if (request.param('id')) {
            options.success = function (lobby) {

                populateModel(lobby, response, function (populatedLobby) {
                    response.send({
                        lobby: populatedLobby
                    });
                });
            };

            crudHelper.findById(options);
        } else {
            options.success = function (lobbies) {
                lobbiesResult = [];

                lobbies.forEach(function (lobby) {
                    lobbiesResult.push(lobby);
                });

                populateModel(lobbiesResult, response, function (populatedLobbies) {
                    response.send({
                        lobbies: populatedLobbies
                    });
                });
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        var options = createOptions(request, response, Lobby);

        options.values.owner = request.user.id;

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            //TODO: Publish!
        };

        crudHelper.create(options);
    },
    update: function (request, response) {
        var options = createOptions(request, response, Lobby);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            //TODO: Publish!
        };

        crudHelper.update(options);
    },
    destroy: function (request, response) {
        var options = createOptions(request, response, Lobby);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            //TODO: Publish!
        };

        crudHelper.destroy(options);
    }
};

'use strict';

var Membership = require('../bs-models/membership');

module.exports = {
    join: function (request, response) {
        var values = {
            player: request.user.id,
            lobby: request.param('id')
        };

        Membership.forge(values).save().then(function (lobby) {
            response.send({
                lobby: lobby
            });
        });
    },
    leave: function (request, response) {
        var values = {
            lobby: request.param('id'),
            player: request.user.id
        };

        Membership.forge().query().where(values).del().then(function () {
            response.send({
                //TODO: Look into what to send to client
                lobby: {
                    id: request.param('id')
                }
            });
        });
    },
    kick: function (request, response) {
        var values = {
            lobby: request.param('id'),
            player: request.param('member').id
        };

        Membership.forge().query().where(values).del().then(function () {
            response.send({
                lobby: {
                    id: request.param('id')
                }
            });
        });
    }
};

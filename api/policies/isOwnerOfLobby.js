'use strict';

module.exports = function (request, response, ok) {
    Lobby.findOne(request.param('id')).done(function (error, lobby) {
        //TODO: toString shouldn't have to be called? Why is lobby.owner a string, its a ID-integer
        if (request.isAuthenticated() && request.user.id.toString() === lobby.owner) {
            ok();
        } else {
            //TODO: Check if error and send it as response (ex: if lobby not found)
            response.send({
                status: 403,
                message: 'You are not permitted to perform this action.'
            });
        }
    });
};

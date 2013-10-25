'use strict';

module.exports = function (request, response) {
    return {
        //TODO: Check if request.target and request.params isn't empty!
        modelType: sails.models[request.target.controller],
        values: request.params.all(),
        error: function (error) {
            response.send(error);
        },
        notFound: function () {
            response.notFound();
        }
    };
};

'use strict';

module.exports = function (request, response) {
    return {
        //TODO: Consider to check if request.target and request.params isn't empty!
        modelType: sails.models[request.target.controller],
        values: request.params.all(),
        error: function (error) {
            response.error(error);
        },
        notFound: function () {
            response.notFound();
        }
    };
};

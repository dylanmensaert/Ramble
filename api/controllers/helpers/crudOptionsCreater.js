'use strict';
var getModelType = function (request) {
        if (request.target) {
            return sails.models[request.target.controller];
        }
    },
    getValues = function (request) {
        if (request.params) {
            return request.params.all();
        }
    };

module.exports = function (request, response) {
    return {
        modelType: getModelType(request),
        values: getValues(request),
        error: function (error) {
            response.error(error);
        },
        notFound: function () {
            response.notFound();
        }
    };
};

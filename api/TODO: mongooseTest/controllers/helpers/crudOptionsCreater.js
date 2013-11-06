'use strict';

module.exports = function (request, response, modelType) {
    return {
        modelType: modelType,
        values: request.params.all(),
        error: function (error) {
            response.error(error);
        },
        notFound: function () {
            response.notFound();
        }
    };
};

'use strict';

module.exports = {
    getFindOptions: function (Models, relations, request) {
        return {
            Models: Models,
            queryParams: request.params.all(),
            relations: relations,
            limit: request.param('limit'),
            offset: request.param('offset')
        };
    }
};

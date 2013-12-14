'use strict';

module.exports = {
    getFindManyOptions: function (Models, relations, request) {
        return {
            Models: Models,
            ids: request.param('ids'),
            relations: relations
        };
    },
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
'use strict';

var executeQuery = function (options) {
    return options.query.then(function (models) {
        options.modelCollection.add(models);

        return options.modelCollection.load(options.relations);
    });
};

module.exports = {
    find: function (options) {
        var modelCollection = options.Models.forge(),
            query;

        delete options.queryParams.limit;
        delete options.queryParams.offset;

        query = modelCollection.query().where(options.queryParams);

        if (options.limit) {
            query = query.limit(options.limit);

            if (options.offset) {
                query = query.offset(options.offset);
            }
        }

        options = {
            query: query,
            modelCollection: modelCollection,
            relations: options.relations
        };

        return executeQuery(options);
    }
};

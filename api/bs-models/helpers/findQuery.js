'use strict';

module.exports = function(collection, relations, queryParams) {
    // TODO: Implement sort.
    var limit = queryParams.limit,
        offset = queryParams.offset,
        query;

    delete queryParams.limit;
    delete queryParams.offset;

    query = collection.query().where(queryParams);

    if (limit) {
        query = query.limit(limit);

        if (offset) {
            query = query.offset(offset);
        }
    }

    return query.then(function(models) {
        collection.add(models);

        return collection.load(relations);
    });
};

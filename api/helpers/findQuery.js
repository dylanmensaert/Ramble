'use strict';

module.exports = function (queryParams) {
    var limit = queryParams.limit,
        offset = queryParams.offset,
        query;

    delete queryParams.limit;
    delete queryParams.offset;

    query = this.query().where(queryParams);

    if (limit) {
        query = query.limit(limit);

        if (offset) {
            query = query.offset(offset);
        }
    }

    return query.then(function (models) {
        this.add(models);

        return this.load(this.relationNames);
    }.bind(this));
};

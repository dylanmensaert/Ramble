'use strict';

var executeMany = function (options, success) {
    options.query.then(function (models) {
        options.modelCollection.add(models);

        return options.modelCollection.load(options.relations);
    }).then(function (models) {
            success(models);
        });
};

module.exports = {
    findOne: function (options, success) {
        options.Model.forge({id: options.id}).fetch({withRelated: options.relations}).then(function (model) {
            success(model);
        });
    },
    findMany: function (options, success) {
        var modelCollection = options.Models.forge(),
            query = modelCollection.query().whereIn(options.ids);

        options = {
            query: query,
            modelCollection: modelCollection,
            relations: options.relations
        };

        executeMany(options, success);
    },
    find: function (options, success) {
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

        executeMany(options, success);
    }
};

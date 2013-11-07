'use strict';

module.exports = {
    findById: function (options) {
        options.modelType.findById(options.values.id, function (error, model) {
            if (error) {
                options.error(error);
            } else if (!model) {
                options.notFound();
            } else {
                options.success(model);
            }
        });
    },
    find: function (options) {
        var where,
            query;

        where = options.values;

        delete where.limit;
        delete where.skip;
        delete where.sort;

        query = {
            limit: options.values.limit,
            skip: options.values.skip,
            sort: options.values.sort,
            where: where
        };

        options.modelType.find(query, function (error, models) {
                if (error) {
                    options.error(error);
                } else if (!models) {
                    options.notFound();
                } else {
                    options.success(models);
                }
            }
        );
    },
    create: function (options) {
        options.modelType.create(options.values, function (error, model) {
            if (error) {
                options.error(error);
            } else {
                options.success(model);
            }
        });
    },
    update: function (options) {
        options.modelType.findByIdAndUpdate(options.values.id, options.values, function (error, model) {
            if (error) {
                options.error(error);
            } else if (!model) {
                options.notFound();
            } else {
                options.success(model);
            }
        });
    },
    destroy: function (options) {
        options.modelType.findByIdAndRemove(options.values.id, function (error, model) {
            if (error) {
                options.error(error);
            } else if (!model) {
                options.notFound();
            } else {
                options.success(model);
            }
        });
    }
};

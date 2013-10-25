'use strict';

var findOneHelper = function (options, success) {
    options.modelType.findOne(options.values.id).done(function (error, model) {
        if (error) {
            options.error(error);
        } else if (!model) {
            options.notFound();
        } else {
            success(model);
        }
    });
};

module.exports = {
    findOne: function (options) {
        findOneHelper(options, function (model) {
            options.success(model);
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

        options.modelType.find(query).done(function (error, models) {
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
        findOneHelper(options, function () {
            options.modelType.update(options.values.id, options.values, function (error, model) {
                if (error) {
                    options.error(error);
                } else {
                    options.success(model);
                }
            });
        });
    },
    destroy: function (options) {
        findOneHelper(options, function (model) {
            options.modelType.destroy(options.values.id, function (error) {
                if (error) {
                    options.error(error);
                } else {
                    options.success(model);
                }
            });
        });
    }
};

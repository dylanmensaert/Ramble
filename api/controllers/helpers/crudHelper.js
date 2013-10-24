'use strict';

module.exports = {
    findOne: function (options) {
        options.modelType.findOne(options.values.id).done(function (error, model) {
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
            query,
            modelsResult;

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
                    modelsResult = [];

                    //TODO: use callback to filter all models in array?
                    models.forEach(function (model) {
                        modelsResult.push(model);
                    });

                    options.success(modelsResult);
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
        var id = options.values.id;

        options.modelType.findOne(id).done(function (error, model) {
            if (error) {
                options.error(error);
            } else if (!model) {
                options.notFound();
            } else {
                options.modelType.update(id, options.values, function (error, model) {
                    if (error) {
                        options.error(error);
                    } else {
                        options.success(model);
                    }
                });
            }
        });
    },
    destroy: function (options) {
        var id = options.values.id;

        options.modelType.findOne(id).done(function (error, model) {
            if (error) {
                options.error(error);
            } else if (!model) {
                options.notFound();
            } else {
                //TODO: Duplicate update/destroy compared to find!
                options.modelType.destroy(id, function (error) {
                    if (error) {
                        options.error(error);
                    } else {
                        options.success(model);
                    }
                });
            }
        });
    }
};

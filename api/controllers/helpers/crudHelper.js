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
            queryOptions,
            modelValues;

        where = options.values;

        delete where.limit;
        delete where.skip;
        delete where.sort;

        queryOptions = {
            limit: options.values.limit,
            skip: options.values.skip,
            sort: options.values.sort,
            where: where
        };

        options.modelType.find(queryOptions).done(function (error, models) {
                if (error) {
                    options.error(error);
                } else if (!models) {
                    options.notFound();
                } else {
                    modelValues = [];

                    models.forEach(function (model) {
                        modelValues.push(model.toJSON());
                    });

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

                options.modelType.publishCreate(model.toJSON());
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

                        options.modelType.publishUpdate(model.id, model.toJSON());
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
                options.modelType.destroy(id, function (error) {
                    if (error) {
                        options.error(error);
                    } else {
                        options.success(model);

                        options.modelType.publishDestroy(model.id);
                    }
                });
            }
        });
    }

};
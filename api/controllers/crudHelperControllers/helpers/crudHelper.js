'use strict';

var executeMany = function (options, success) {
    options.promise.then(function (models) {
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
            promise = modelCollection.query().whereIn(options.ids);

        options = {
            promise: promise,
            modelCollection: modelCollection,
            relations: options.relations
        };

        executeMany(options, success);
    },
    find: function (options, success) {
        var modelCollection = options.Models.forge(),
            promise;

        delete options.queryParams.limit;
        delete options.queryParams.offset;

        promise = modelCollection.query().where(options.queryParams);

        if (options.limit) {
            promise = promise.limit(options.limit);

            if (options.offset) {
                promise = promise.offset(options.offset);
            }
        }

        options = {
            promise: promise,
            modelCollection: modelCollection,
            relations: options.relations
        };

        executeMany(options, success);
    },
    save: function (Model, values, success) {
        var model = Model.forge(values);

        model.hashPassword().then(function () {
            return model.save();
        }).then(function (model) {
                success(model);
            });
    },
    destroy: function (Model, id, success) {
        Model.forge({id: id}).destroy().then(function (model) {
            success(model);
        });
    }
};

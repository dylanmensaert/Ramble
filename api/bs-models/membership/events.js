'use strict';

var Membership,
    bluebird = require('bluebird'),
    reassignMembershipOfTypeHost,
    hasMembershipId;

reassignMembershipOfTypeHost = function(model, value, options) {
    var values,
        promise;

    if (model.type === 'participant' && hasMembershipId(options)) {
        values = {
            id: options.membershipId,
            type: 'host'
        };

        promise = Membership.forge(values).save();
    }

    return promise;
};

hasMembershipId = function(options) {
    return options && options.membershipId;
};

module.exports = {
    init: function(model) {
        Membership = model;

        Membership.on('change:type', this.onTypeChanged);
    },
    onTypeChanged: function(model, value, options) {
        return bluebird.all([
            reassignMembershipOfTypeHost(model, value, options)
        ]);
    }
};

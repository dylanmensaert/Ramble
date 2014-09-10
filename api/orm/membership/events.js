'use strict';

var Membership,
    reassignOwnership,
    hasMembershipId;

reassignOwnership = function(model, value, options) {
    var values;

    if (model.type === 'member' && hasMembershipId(options)) {
        values = {
            id: options.membershipId,
            type: 'owner'
        };

        Membership.forge(values).save();
    }
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
        reassignOwnership(model, value, options);
    }
};

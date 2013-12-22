define(function (require) {
    'use strict';

    var DS = require('ember-data');

    return DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
            ownedLobbies: {
                embedded: 'always'
            },
            joinedLobbies: {
                embedded: 'always'
            }
        }
    });
});

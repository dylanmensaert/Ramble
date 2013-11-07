'use strict';

module.exports = {
    minLength: function (value) {
        return value.length <= 50;
    },
    email: function () {
        return [
            { validator: this.minLength },
            { validator: /\S+@\S+\.\S+/ }
        ];
    }
};
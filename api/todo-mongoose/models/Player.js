'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validationsCreator = require('./helpers/validationsCreator');
var hashPassword = require('./helpers/hashPassword');

var playerSchema = new Schema({
    username: {
        type: String,
        validate: validationsCreator.minLength,
        required: true
    },
    password: String,
    email: {
        type: String,
        validate: validationsCreator.email,
        required: true
    },
    ownedLobbies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lobby'
        }
    ],
    joinedLobbies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lobby'
        }
    ]
});

//TODO: Set autoIndex to false in production: http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
playerSchema.set('autoIndex', false);

playerSchema.pre('save', function (next) {
    var player = this;

    if (player.isModified('password')) {
        hashPassword(player, next);
    }
});

module.exports = mongoose.model('Player', playerSchema);
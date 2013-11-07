'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validationsCreator = require('./helpers/validationsCreator'),
    hashPassword = require('./helpers/hashPassword'),

    lobbySchema = new Schema({
        title: {
            type: String,
            validate: validationsCreator.minLength,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        maxMembers: {
            type: Number,
            required: true
        },
        owner: {
            type: Number,
            required: true,
            ref: 'Player'
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Player'
            }
        ]
    });

//TODO: Set autoIndex to false in production: http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
lobbySchema.set('autoIndex', false);

lobbySchema.pre('save', function (next) {
    var lobby = this;

    if (lobby.isModified('password')) {
        hashPassword(lobby, next);
    }
});

mongoose.model('Lobby', lobbySchema);

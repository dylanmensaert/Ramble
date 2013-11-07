/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ramble');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
    var lobbySchema = new Schema({
        title: {
            type: String,
            validate: minLength,
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
    })

    //TODO: Set autoIndex to false in production: http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
    lobbySchema.set('autoIndex', false);

    var Lobby = mongoose.model('Lobby', lobbySchema)

    lobbySchema.pre('save', function (next) {
        var lobby = this;

        if (lobby.isModified('password')) {
            hashPassword(lobby, next);
        }
    })

    lobbySchema.methods.find = function () {
        Lobby.findById(function (error, lobby) {
            if (error) {

            } else if (!lobby) {
                notFound();
            } else {
                var references = [
                    {
                        path: 'owner'
                    },
                    {
                        path: 'members'
                    }
                ]
                Lobby.populate(lobby, references, function (error, lobby) {
                    if (error) {

                    } else {

                    }
                })
            }
        })

        Lobby.find(function (error, lobbies) {
            if (error) {

            } else if (!lobbies) {
                notFound();
            } else {
                var references = [
                    {
                        path: 'owner'
                    },
                    {
                        path: 'members'
                    }
                ]
                Lobby.populate(lobbies, references, function (error, lobbies) {
                    if (error) {

                    } else {

                    }
                })
            }
        })

        Lobby.create(function (error, lobby) {
            if (error) {

            }
        })

        Lobby.findByIdAndRemove(function (error) {
            if (error) {

            }
        })

        Lobby.findByIdAndUpdate(function (error, lobbies) {
            if (error) {

            }
        })
    }

    var playerSchema = new Schema({
        username: {
            type: String,
            validate: minLength,
            required: true
        },
        password: String,
        email: {
            type: String,
            validate: email,
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
    })

    //TODO: Set autoIndex to false in production: http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
    playerSchema.set('autoIndex', false);

    var Player = mongoose.model('Lobby', playerSchema)

    playerSchema.pre('save', function (next) {
        var player = this;

        if (player.isModified('password')) {
            hashPassword(player, next);
        }
    })

    function minLength(value) {
        return value.length <= 50
    }

    var email = [
        { validator: minLength },
        { validator: /\S+@\S+\.\S+/ }
    ]

    var bcrypt = require('bcrypt'),
        hashPassword = function (values, next) {
            bcrypt.hash(values.password, 10, function (error, hashedPassword) {
                if (error) {
                    next(error);
                } else {
                    values.password = hashedPassword;

                    next();
                }
            });
        };

});*/

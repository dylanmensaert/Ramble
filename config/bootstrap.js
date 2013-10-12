'use strict';

/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
    cb();

    Lobby.create({
        'title': 'Game Dylan en Dimitri',
        'password': 'zonneschijn',
        'maxMembers': 5,
        'owner': 'p1',
        'members': ['p2', 'p3', 'p5', 'p8']
    });

    Lobby.create({
        'title': 'winners lobby!',
        'password': 'Dolfijn',
        'maxMembers': 12,
        'owner': 'p6',
        'members': ['p5', 'p3', 'p8', 'p1']
    });

    Lobby.create({
        'title': 'eten',
        'password': 'open',
        'maxMembers': 7,
        'owner': 'p8',
        'members': []
    });

    Player.create({
        'username': 'donut',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': ['l1'],
        'joinedLobbies': ['l3']
    });

    Player.create({
        'username': 'pizaa',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': ['l1']
    });

    Player.create({
        'username': 'zizima',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': ['l1', 'l2', 'l3']
    });

    Player.create({
        'username': 'madeentje',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': ['l2']
    });

    Player.create({
        'username': 'cryptex',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': ['l3', 'l1']
    });

    Player.create({
        'username': 'heca',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': ['l3'],
        'joinedLobbies': []
    });

    Player.create({
        'username': 'bosbes',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': []
    });

    Player.create({
        'username': 'graaaah',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': ['l2', 'l4'],
        'joinedLobbies': ['l3', 'l1']
    });

    Player.create({
        'username': 'antiliaan',
        'email': 'aaaa@gmail.com',
        'ownedLobbies': [],
        'joinedLobbies': ['l2']
    });

    // It's very important to trigger this callack method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
};

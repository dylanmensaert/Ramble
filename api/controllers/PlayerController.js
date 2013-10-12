'use strict';

/**
 * PlayerController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */

module.exports = {
    create: function (req, res) {
        Player.create(req.param('player')).done(function (err, player) {
            res.json({
                player: player
            });
        });
    }
};

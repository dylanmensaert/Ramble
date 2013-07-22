"use strict";

exports.index = function (req, res) {
    var env = req.app.get("env");

    res.render("index", {
        env : env
    });
};

"use strict";

exports.index = function (req, res) {
    var environment = req.app.get("env");

    res.render("index", {
        environment : environment
    });
};

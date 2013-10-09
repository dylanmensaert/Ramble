'use strict';

/**
 * Default 404 (not found) handler
 *
 * If no matches are found, Sails will respond using this handler:
 *
 * For more information on 404/notfound handling in Sails/Express, check out:
 * http://expressjs.com/faq.html#404-handling
 */

module.exports[404] = function (req, res, express404Handler) {
    var statusCode,
        result,
        view;

    statusCode = 404;
    result = {
        status: statusCode
    };

    // If the user-agent wants a JSON response, send json
    if (req.wantsJSON) {
        return res.json(result, result.status);
    }

    // Otherwise, serve the `views/404.*` page
    view = '404';

    res.render(view, result, function (err) {
        if (err) {
            return express404Handler();
        }

        res.render(view);
    });
};

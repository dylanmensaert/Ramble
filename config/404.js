'use strict';

/**
 * Default 404 (Not Found) handler
 *
 * If no route matches are found for a request, Sails will respond using this handler.
 *
 * This middleware can also be invoked manually from a controller or policy:
 * Usage: res.notFound()
 */

module.exports[404] = function (req, res) {

    /*
     * NOTE: This function is Sails middleware-- that means that not only do `req` and `res`
     * work just like their Express equivalents to handle HTTP requests, they also simulate
     * the same interface for receiving socket messages.
     */

    var viewFilePath = '404',
        statusCode = 404,
        result = {
            status: statusCode
        };

    // If the user-agent wants a JSON response, send json
    if (req.wantsJSON) {
        return res.send(result, result.status);
    }

    res.status(result.status);
    res.render(viewFilePath, function (err) {
        // If the view doesn't exist, or an error occured, send json
        if (err) {
            return res.send(result, result.status);
        }

        // Otherwise, serve the `views/404.*` page
        res.render(viewFilePath);
    });

};

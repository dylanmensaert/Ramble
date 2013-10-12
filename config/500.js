/* jshint maxstatements: false, maxcomplexity: false */
'use strict';

/**
 * Default 500 (Server Error) middleware
 *
 * If an error is thrown in a policy or controller,
 * Sails will respond using this default error handler
 *
 * This middleware can also be invoked manually from a controller or policy:
 * res.serverError( [errors] )
 *
 *
 * @param {Array|Object|String} errors
 *      optional errors
 */

module.exports[500] = function (errors, req, res) {

    /*
     * NOTE: This function is Sails middleware-- that means that not only do `req` and `res`
     * work just like their Express equivalents to handle HTTP requests, they also simulate
     * the same interface for receiving socket messages.
     */

    var viewFilePath = '500',
        statusCode = 500,
        errorIndex,
        errorToLog,
        errorToJSON,
        result = {
            status: statusCode
        },
    // Normalize a {String|Object|Error} or array of {String|Object|Error}
    // into an array of proper, readable {Error}
        errorsToDisplay = sails.util.normalizeErrors(errors),
        resultIndex;

    for (errorIndex = 0; errorIndex < errorsToDisplay.length; errorIndex += 1) {

        // Log error(s) as clean `stack`
        // (avoids ending up with \n, etc.)
        if (errorsToDisplay[errorIndex].original) {
            errorToLog = sails.util.inspect(errorsToDisplay[errorIndex].original);
        }
        else {
            errorToLog = errorsToDisplay[errorIndex].stack;
        }
        sails.log.error('Server Error (500)');
        sails.log.error(errorToLog);

        // Use original error if it exists
        errorToJSON = errorsToDisplay[errorIndex].original || errorsToDisplay[errorIndex].message;
        errorsToDisplay[errorIndex] = errorToJSON;
    }

    // Only include errors if application environment is set to 'development'
    // In production, don't display any identifying information about the error(s)
    if (sails.config.environment === 'development') {
        result.errors = errorsToDisplay;
    }

    // If the user-agent wants JSON, respond with JSON
    if (req.wantsJSON) {
        return res.json(result, result.status);
    }

    // Set status code and view locals
    res.status(result.status);
    for (resultIndex = 0; resultIndex < result.length; resultIndex += 1) {
        res.locals[resultIndex] = result[resultIndex];
    }
    // And render view
    res.render(viewFilePath, result, function (err) {
        // If the view doesn't exist, or an error occured, just send JSON
        if (err) {
            return res.json(result, result.status);
        }

        // Otherwise, if it can be rendered, the `views/500.*` page is rendered
        res.render(viewFilePath, result);
    });

};

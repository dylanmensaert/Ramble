/* jshint maxstatements: false, maxparams: false, maxcomplexity: false */
'use strict';

//TODO: Simplify this code!
/**
 * Default error handler
 *
 * If an error is thrown, Sails will respond using this default error handler
 *
 * For more information on error handling in Sails/Express, check out:
 * http://expressjs.com/guide.html#error-handling
 */

module.exports[500] = function (errors, req, res, expressErrorHandler) {
    var statusCode,
        displayedErrors,
        response,
        inspect,
        errorIndex,
        view;

    statusCode = 500;

    // Ensure that `errors` is a list
    displayedErrors = (typeof errors !== 'object' || !errors.length) ? [errors] : errors;

    // Build data for response
    response = {
        status: statusCode
    };

    // Ensure that each error is formatted correctly
    inspect = require('util').inspect;
    for (errorIndex = 0; errorIndex < displayedErrors.length; errorIndex += 1) {

        // Make error easier to read, and normalize its type
        if (!(displayedErrors[errorIndex] instanceof Error)) {
            displayedErrors[errorIndex] = new Error(inspect(displayedErrors[errorIndex]));
        }

        displayedErrors[errorIndex] = {
            message: displayedErrors[errorIndex].message,
            stack: displayedErrors[errorIndex].stack
        };

        // Log error to log adapter
        sails.log.error(displayedErrors[errorIndex].stack);
    }

    // In production, don't display any identifying information about the error(s)
    if (sails.config.environment === 'development') {
        response.errors = displayedErrors;
    }

    // If the user-agent wants a JSON response,
    // respond with a JSON-readable version of errors
    if (req.wantsJSON) {
        return res.json(response, response.status);
    }

    // Otherwise, if it can be rendered, the `views/500.*` page is rendered
    // If an error occurs rendering the 500 view ITSELF,
    // use the built-in Express error handler to render the errors
    view = '500';

    res.render(view, response, function (err) {
        if (err) {
            return expressErrorHandler(errors);
        }

        res.render(view, response);
    });
};

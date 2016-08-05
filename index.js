var morgan = require('morgan');
var interceptor = require('express-interceptor');

morgan.token('date', function(req, res) {
    return new Date().toLocaleTimeString();
});
morgan.token('reqbody', function(req, res) {
    return JSON.stringify(req.body);
});

module.exports.requestLogger = function(logformat) {
    return morgan(logformat);
};

module.exports.token = function(name, callback) {
    morgan.token(name, callback);
};

module.exports.responseLogger = function() {
    return (interceptor(function(req, res) {
        return {
            // Only HTML responses will be intercepted
            isInterceptable: function() {
                return true;
            },
            // Appends a paragraph at the end of the response body
            intercept: function(body, send) {
                console.log(body);
                send(body);
            }
        };
    }));
};

var Client = exports.Client = require("./client").Client,
    Connection = exports.Connection = require("./connection").Connection;

exports.createClient = function (managers) {
    return new Client(managers);
};

var createConnection = exports.createConnection = function (hostport) {
    return new Connection(hostport);
};

// Create an array of connections from a string or array
exports.createConnections = function (managers) {
    var s = [];
    if (typeof managers === "string") {
        s = [managers];
    } else if (Array.isArray(managers)) {
        s = managers;
    }
    return s.map(createConnection);
};

var Client = exports.Client = require("./client").Client,
    Server = exports.Server = require("./server").Server;

exports.createClient = function (servers) {
    return new Client(servers);
};

var createServer = exports.createServer = function (hostport) {
    return new Server(hostport);
};

// Create an array of servers from a string or array
exports.createServers = function (servers) {
    var s = [];
    if (typeof servers === "string") {
        s = [servers];
    } else if (Array.isArray(servers)) {
        s = servers;
    }
    return s.map(createServer);
};

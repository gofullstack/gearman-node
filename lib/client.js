var gearman = require("./gearman"),
    Job = require("./job").Job,
    Client,
    defaults = { host: "localhost", port: 4730 };

// Creates an object with the host:port items as keys and connection objects as
// values from a String or Array of items.
function setConnections(managers) {
    var c = {},
        m = [];

    if (Array.isArray(managers)) {
        m = managers;
    } else {
        m = [managers];
    }

    m.forEach(function (hostport) {
        if (!hostport) { hostport = [defaults.host, defaults.port].join(":"); }

        c[hostport] = {}; // TODO: make this object a connection
    });

    return c;
}

Client = function (managers) {
    if (!(this instanceof Client)) { return new Client(managers); }

    this.connections = setConnections(managers);
    this.connectionIndex = 0; // for keeping track of which connection
};

exports.Client = Client;

// Get a connection object from the ones we have
// (simple round-robin submission for now)
Client.prototype.getConnection = function () {
    var c = this.connections,
        k = Object.keys(c),
        len = k.length;

    return c[k[this.connectionIndex++ % len]];
};

Client.prototype.submitJob = function (name, data, options) {
    return new Job();
};

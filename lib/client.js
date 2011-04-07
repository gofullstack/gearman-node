var gearman = require("./gearman"),
    Job = require("./job").Job,
    packet = require("./packet"),
    extend = require("./util").extend,
    net = require("net"),
    Client,
    defaults = { host: "localhost", port: 4730 };

Client = function (port, host) {
    if (!(this instanceof Client)) { return new Client(port, host); }
    extend(this, {
        port: Number(port) || defaults.port,
        host: host || defaults.host,
        jobs: {},
        lastJobSubmitted: null,
        connection: null
    });
};
exports.Client = Client;

// Creates the client connection if there isn't one, opens the connection if
// it's closed, and sets up listeners. Returns the connection object
Client.prototype.getConnection = function () {
    var conn = this.connection,
        client = this;

    if (!conn) {
        conn = net.createConnection(this.port, this.host);

        conn.on("connect", function (data) {
            client.connected = true;
        });

        conn.on("close", function (error) {
            client.connected = false;
        });

        conn.on("data", function (data) {
        });

    } else if (!client.connected) {
        conn.connect(this.port, this.host);
    }

    this.connection = conn;
    return conn;
};

// Close connections
Client.prototype.end = function () {
    var conn = this.connection;
    if (conn) { conn.end(); }
};

// Submit a job
Client.prototype.submitJob = function (name, data, options) {
    options = extend({
        name: name,
        data: data,
        client: this
    }, options || {});

    var job = new Job(options);
    job.submit();
    return job;
};

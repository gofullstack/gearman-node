var gearman = require("./gearman"),
    Job = require("./job").Job,
    packet = require("./packet"),
    util = require("./util"),
    extend = util.extend,
    debug = util.debug,
    responses = require("./client/responses"),
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

        conn.on("data", function (data) {
            // decode the data and execute the proper response handler
            data = packet.decode(data);
            var type = data.type;
            debug("Recieved:", data);
            if (type in responses) { responses[type](data, client); }
        });
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

// Get a job's status from its handle
Client.prototype.getJobStatus = function (handle, callback) {
    var job = this.jobs[handle];

    // If we don't have the job, create it
    if (!job) {
        job = new Job({ client: this, handle: handle, background: true });
    }
    job.getStatus(callback);
};

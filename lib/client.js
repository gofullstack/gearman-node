var gearman = require("./gearman"),
    Job = require("./job").Job,
    Client,
    defaults = { host: "localhost", port: 4730 };

Client = function (port, host) {
    if (!(this instanceof Client)) { return new Client(port, host); }

    this.port = Number(port) || defaults.port;
    this.host = host || defaults.host;
    this.jobs = {};
    this.connection = null;
};

exports.Client = Client;

Client.prototype.submitJob = function (name, data, options) {
    options = options || {};
    options.name = name;
    options.data = data;
    options.client = this;
    return new Job(options);
};

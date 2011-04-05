var gearman = require("./gearman"),
    Job = require("./job").Job,
    Client,
    defaults = { host: "localhost", port: 4730 };

Client = function (port, host) {
    if (!(this instanceof Client)) { return new Client(port, host); }
};

exports.Client = Client;

Client.prototype.submitJob = function (name, data, options) {
    return new Job();
};

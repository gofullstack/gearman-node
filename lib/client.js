var gearman = require("./gearman"),
    Job = require("./job").Job,
    Client;

Client = function (managers) {
    if (!(this instanceof Client)) { return new Client(managers); }
};

exports.Client = Client;

Client.prototype.submitJob = function (name, data, options) {
    return new Job();
};

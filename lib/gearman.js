var Client = require("./client").Client,
    Job = require("./job").Job;

exports.Client = Client;
exports.Job = Job;

exports.createClient = function (port, host) {
    return new Client(port, host);
};

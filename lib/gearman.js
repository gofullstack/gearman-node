var Client = require("./client").Client,
    Job = require("./job").Job;

exports.Client = Client;
exports.Job = Job;

exports.createClient = function (managers) {
    return new Client(managers);
};

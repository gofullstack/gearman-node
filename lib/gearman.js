var Client = require("./client").Client;

exports.Client = Client;
exports.Job = require("./job").Job;
exports.createClient = function (port, host) { return new Client(port, host); };

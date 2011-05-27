var Client = require("./client").Client;
var Worker = require("./worker").Worker;

exports.Client = Client;
exports.Worker = Worker;
exports.Job = require("./job").Job;
exports.createClient = function (port, host) { return new Client(port, host); };
exports.createWorker = function (port, host) { return new Worker(port, host); };

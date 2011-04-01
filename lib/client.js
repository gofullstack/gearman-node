var gearman = require("./gearman");

var Client = exports.Client = function (managers) {
    if (!(this instanceof Client)) { return new Client(managers); }
};

Client.prototype.submitJob = function (name, data, encoding) {
    return {};
};

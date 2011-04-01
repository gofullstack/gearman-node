var gearman = require("./gearman");

var Client = exports.Client = function (managers) {
    if (!(this instanceof Client)) { return new Client(managers); }

    this.servers = gearman.createConnections(managers);
};

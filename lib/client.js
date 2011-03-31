var gearman = require("./gearman");

var Client = exports.Client = function (servers) {
    if (!(this instanceof Client)) { return new Client(servers); }

    this.servers = gearman.createServers(servers);
};

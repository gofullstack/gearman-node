var Client = exports.Client = require("./client").Client;
exports.createClient = function (servers) {
    return new Client(servers);
};

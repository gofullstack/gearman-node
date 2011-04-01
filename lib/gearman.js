var Client = exports.Client = require("./client").Client;

exports.createClient = function (managers) {
    return new Client(managers);
};

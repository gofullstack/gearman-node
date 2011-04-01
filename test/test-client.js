var gearman = require("gearman"),
    Client = gearman.Client;

exports["createClient"] = function (test) {
    test.ok(gearman.createClient() instanceof Client, "gearman.createClient() creates a client");
    test.done();
};

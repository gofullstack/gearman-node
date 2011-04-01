var gearman = require("gearman"),
    Client = gearman.Client;

exports["createClient"] = function (test) {
    test.ok(gearman.createClient() instanceof Client, "gearman.createClient() creates a client");
    test.done();
};

exports["submitJob"] = function (test) {
    var client = gearman.createClient();
    test.equal("object", typeof client.submitJob(), "client.submitJob() creates an object");
    test.done();
};

var gearman = require("gearman"),
    Client = gearman.Client,
    Job = gearman.Job;

exports["createClient"] = function (test) {
    var client = gearman.createClient();
    test.ok(client instanceof Client, "gearman.createClient() creates a client");
    test.equal(client.port, 4730, "default port 4730");
    test.equal(client.host, "localhost", "default host 'localhost'");

    client = gearman.createClient(1234, "test");

    test.equal(client.port, 1234, "port argument 1234");
    test.equal(client.host, "test", "host argument 'test'");

    test.done();
};

exports["submitJob"] = function (test) {
    var client = gearman.createClient();
    test.ok(client.submitJob() instanceof Job, "client.submitJob() creates a job");
    test.done();
};

exports["end"] = function (test) {
    var client = gearman.createClient();
    test.ok(typeof client.end === "function", "client.end() method exists");
    test.done();
};

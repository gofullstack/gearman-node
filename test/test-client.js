var gearman = require("gearman"),
    Client = gearman.Client,
    Job = gearman.Job;

exports["createClient"] = function (test) {
    var client = gearman.createClient();
    test.ok(client instanceof Client, "gearman.createClient() creates a client");

    test.equal(typeof client.connections, "object", "client has a connections object");
    test.equal(Object.keys(client.connections)[0], "localhost:4730", "first default connection key is localhost:4730");
    test.equal(typeof client.connections["localhost:4730"], "object", "first default connection value is an object");

    client = gearman.createClient("example.com:9999");
    test.equal(Object.keys(client.connections)[0], "example.com:9999", "connection key from string");

    client = gearman.createClient(["example.com:9999", "example2.com:8888"]);
    test.equal(Object.keys(client.connections)[0], "example.com:9999", "connection key from array");
    test.equal(Object.keys(client.connections)[1], "example2.com:8888", "2nd connection key from array");

    test.done();
};

exports["submitJob"] = function (test) {
    var client = gearman.createClient();
    test.ok(client.submitJob() instanceof Job, "client.submitJob() creates a job");
    test.done();
};

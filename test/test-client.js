var gearman = require("gearman"),
    Client = gearman.Client,
    Job = gearman.Job,
    testCase = require("nodeunit").testCase,
    client = gearman.createClient();

module.exports = testCase({
    "createClient": function (test) {
        test.ok(client instanceof Client,
                "gearman.createClient() creates a client");
        test.equal(client.port, 4730, "default port 4730");
        test.equal(client.host, "localhost", "default host 'localhost'");

        client = gearman.createClient(1234, "test");

        test.equal(client.port, 1234, "port argument 1234");
        test.equal(client.host, "test", "host argument 'test'");

        test.done();
    },

    "submitJob": function (test) {
        test.ok(client.submitJob("test") instanceof Job,
                "client.submitJob() creates a job");
        test.done();
    },

    "end": function (test) {
        test.ok(typeof client.end === "function",
                "client.end() method exists");
        test.done();
    }
});

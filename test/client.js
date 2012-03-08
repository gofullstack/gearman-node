var gearman = require("gearman"),
    Client = gearman.Client,
    Job = gearman.Job,
    Socket = require("net").Socket,
    testCase = require("nodeunit").testCase,
    client;

// gearman.debug = true;

client = gearman.createClient();

module.exports = testCase({
    "createClient": function (test) {
        var otherClient;

        test.ok(client instanceof Client,
                "gearman.createClient() creates a client");
        test.equal(client.port, 4730, "default port 4730");
        test.equal(client.host, "localhost", "default host 'localhost'");

        otherClient = gearman.createClient(1234, "example.com");

        test.equal(otherClient.port, 1234, "port argument 1234");
        test.equal(otherClient.host, "example.com", "host argument 'example.com'");

        test.done();
    },

    "getConnection": function (test) {
        test.ok(client.getConnection() instanceof Socket,
                "client.getConnection() returns a Socket");
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
    },

    "getJobStatus": function (test) {
        var job = client.submitJob("test", "test", { background: true });
        test.ok(typeof client.getJobStatus === "function",
                "client.getJobStatus is a function");

        job.on("create", function (handle) {
            client.getJobStatus(handle, function (status) {
                test.deepEqual(status, { handle: handle,
                                         known: true,
                                         running: true,
                                         percentComplete: [ 48, 48 ] });
                test.done();
            });
        });
    }
});

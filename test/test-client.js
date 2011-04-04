var gearman = require("gearman"),
    Client = gearman.Client,
    Job = gearman.Job;

exports["createClient"] = function (test) {
    var client = gearman.createClient();
    test.ok(client instanceof Client, "gearman.createClient() creates a client");
    test.done();
};

exports["submitJob"] = function (test) {
    var client = gearman.createClient();
    test.ok(client.submitJob() instanceof Job, "client.submitJob() creates a job");
    test.done();
};

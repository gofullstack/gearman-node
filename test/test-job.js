var gearman = require("gearman"),
    Job = gearman.Job,
    EventEmitter = require("events").EventEmitter,
    testCase = require("nodeunit").testCase,
    client = gearman.createClient(),
    job = client.submitJob("test", "test", { encoding: "utf8" });

// XXX: These need a real gearman server running on localhost:4730 and
// test/fixtures/worker.rb running. Need to make a mock server or something.

module.exports = testCase({
   "Job": function (test) {
        test.ok(job instanceof EventEmitter,
                "Job instances are EventEmitters");
        test.done();
    },

    "submit": function (test) {
        job.on("create", function (handle) {
            test.ok(typeof handle === "string",
                    "handle returned on create event");
            test.equal(job.handle, handle,
                       "job handle assigned on create event");
            test.done();
        });
    },

   "event: data": function (test) {
        job.on("data", function (result) {
            test.equal("test", result, "work data received");
            test.done();
        });
    },

   "event: warning": function (test) {
        job.on("warning", function (warning) {
            test.equal("test", warning, "work warning received");
            test.done();
        });
    },

    "event: complete": function (test) {
        job.on("complete", function (result) {
            test.equal("tset", result, "work completes");
            test.done();
        });
    },

    "event: fail": function (test) {
        var failJob = client.submitJob("test_fail");
        failJob.on("fail", function () {
            test.ok(true, true, "work fails");
            test.done();
        });
    }
});

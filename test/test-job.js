var gearman = require("gearman"),
    Job = gearman.Job,
    EventEmitter = require("events").EventEmitter;

exports["Job"] = function (test) {
    test.ok(new Job() instanceof EventEmitter, "Job instances are EventEmitters");
    test.done();
};

// XXX: These need a real gearman server running on localhost:4730 and
// fixtures/worker.rb running. Need to make a mock server or something.

exports["submit"] = function (test) {
    var job = new Job({ name: "test" });
    job.on("create", function (handle) {
        test.ok(typeof handle === "string", "handle returned on create event");
        test.equal(job.handle, handle, "job handle assigned on create event");
        test.done();
    });
    job.submit();
};

exports["event: data"] = function (test) {
    var job = new Job({ name: "test", encoding: "utf8" });
    job.on("data", function (result) {
        test.equal("test", result, "work data sent");
        test.done();
    });
    job.submit();
};

exports["event: complete"] = function (test) {
    var job = new Job({ name: "test", data: "test", encoding: "utf8" });
    job.on("complete", function (result) {
        test.equal("tset", result, "work completes");
        test.done();
    });
    job.submit();
};

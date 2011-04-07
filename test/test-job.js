var gearman = require("gearman"),
    Job = gearman.Job,
    EventEmitter = require("events").EventEmitter;

exports["Job"] = function (test) {
    test.ok(new Job() instanceof EventEmitter, "Job instances are EventEmitters");
    test.done();
};

// XXX: These need a real gearman server running on localhost:4730. Need to make
//      a mock server

exports["submit"] = function (test) {
    var job = new Job({ name: "test" });
    job.submit();
    job.on("create", function (handle) {
        test.ok(typeof job.handle === "string", "handle returned on create event");
        test.done();
    });
};

exports["event: complete"] = function (test) {
    // reverse_string is from https://github.com/gearman-ruby/gearman-ruby/blob/master/examples/worker_reverse_string.rb
    var job = new Job({ name: "test", data: "test", encoding: "utf8" });
    job.submit();
    job.on("complete", function (result) {
        test.equal("tset", result, "work completes");
        test.done();
    });
};

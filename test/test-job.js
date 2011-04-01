var gearman = require("gearman"),
    Job = gearman.Job,
    EventEmitter = require("events").EventEmitter;

exports["Job"] = function (test) {
    test.ok(new Job() instanceof EventEmitter, "Job instances are EventEmitters");
    test.done();
};


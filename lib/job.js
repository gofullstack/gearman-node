var gearman = require("gearman"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    Job;

Job = function (options) {
    if (!(this instanceof Job)) { return new Job(options); }
    options = options || {};
    var client = options.client || gearman.createClient();
};
util.inherits(Job, EventEmitter);

exports.Job = Job;

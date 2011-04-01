var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    Job;

Job = function () {
    if (!(this instanceof Job)) { return new Job(); }
};
util.inherits(Job, EventEmitter);

exports.Job = Job;

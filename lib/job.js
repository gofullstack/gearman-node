var gearman = require("gearman"),
    util = require("util"),
    packet = require("./packet"),
    extend = require("./util").extend,
    EventEmitter = require("events").EventEmitter,
    Job;

Job = function (options) {
    if (!(this instanceof Job)) { return new Job(options); }
    extend(this, options);
    this.client = this.client || gearman.createClient();
};
util.inherits(Job, EventEmitter);
exports.Job = Job;

Job.prototype.submit = function () {
    var conn = this.client.getConnection();

    conn.write(packet.encode({
        type: "SUBMIT_JOB",
        name: this.name,
        data: this.data,
        encoding: this.encoding
    }));
};


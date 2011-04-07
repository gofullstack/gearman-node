var gearman = require("gearman"),
    inherits = require("util").inherits,
    extend = require("./util").extend,
    packet = require("./packet"),
    EventEmitter = require("events").EventEmitter,
    Job;

Job = function (options) {
    if (!(this instanceof Job)) { return new Job(options); }
    extend(this, options);
    this.client = this.client || gearman.createClient();
};
inherits(Job, EventEmitter);
exports.Job = Job;

Job.prototype.submit = function () {
    var client = this.client;

    client.getConnection().write(packet.encode({
        type: "SUBMIT_JOB",
        name: this.name,
        data: this.data,
        encoding: this.encoding
    }), this.encoding);
    client.lastJobSubmitted = this;
};

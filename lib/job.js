var gearman = require("gearman"),
    inherits = require("util").inherits,
    util = require("./util"),
    extend = util.extend,
    debug = util.debug,
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
    var client = this.client,
        data = {
            type: "SUBMIT_JOB",
            name: this.name,
            data: this.data,
            encoding: this.encoding
        };

    client.getConnection().write(packet.encode(data), this.encoding);
    debug("Sent:", data);
    client.lastJobSubmitted = this;
};

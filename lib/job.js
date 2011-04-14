var gearman = require("gearman"),
    inherits = require("util").inherits,
    util = require("./util"),
    extend = util.extend,
    debug = util.debug,
    packet = require("./packet"),
    priorities = require("./packet/priorities").names,
    EventEmitter = require("events").EventEmitter,
    Job;

Job = function (options) {
    if (!(this instanceof Job)) { return new Job(options); }
    extend(this, options);
    this.client = this.client || gearman.createClient();
    this.priority =  this.priority || "normal";
};
inherits(Job, EventEmitter);
exports.Job = Job;

Job.prototype.submit = function () {
    var client = this.client,
        data = {
            name: this.name,
            data: this.data,
            encoding: this.encoding
        };

    // Set the type given the priority
    if (!(this.priority in priorities)) { throw Error("invalid priority"); }
    data.type = priorities[this.priority];

    client.getConnection().write(packet.encode(data), this.encoding);
    debug("Sent:", data);
    client.lastJobSubmitted = this;
};

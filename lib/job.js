var gearman = require("gearman"),
    inherits = require("util").inherits,
    uuid = require("node-uuid"),
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
    this.id = this.id || uuid("binary");
    this.client = this.client || gearman.createClient();
    this.priority =  this.priority || "normal";

    // Array of callbacks waiting for status
    this.statusCallbacks = [];
};
inherits(Job, EventEmitter);
exports.Job = Job;

Job.prototype.submit = function () {
    var client = this.client,
        data = {
            id: this.id,
            name: this.name,
            data: this.data,
            encoding: this.encoding
        };

    // Set the type given the priority
    if (!(this.priority in priorities)) { throw Error("invalid priority"); }
    data.type = priorities[this.priority];

    // Append _BG to background jobs' type
    if (this.background) { data.type += "_BG"; }

    client.getConnection().write(packet.encode(data), this.encoding);
    debug("Sent:", data);
    client.lastJobSubmitted = this;
};

Job.prototype.getStatus = function (callback) {
    var data = { type: "GET_STATUS", handle: this.handle };
    this.client.getConnection().write(packet.encode(data));
    debug("Sent:", data);
    if (typeof callback === "function") {this.statusCallbacks.push(callback); }
};

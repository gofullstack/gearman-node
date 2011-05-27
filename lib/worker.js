var gearman = require("./gearman"),
	Job = require("./job").Job,
	packet = require("./packet"),
	util = require("./util"),
	extend = util.extend,
	debug = util.debug,
	responses = require("./worker/responses"),
	net = require("net"),
	Worker,
	defaults = { host: "localhost", port: 4730 };

Worker = function(port, host)
{
	if(!(this instanceof Worker)) { return new Worker(port, host); }
	extend(this, {
		port: Number(port) || defaults.port,
		host: host || defaults.host,
		connection: null
	});
};

exports.Worker = Worker;

Worker.prototype.getConnection = function() {
	var conn = this.connection;

	if(!conn) {
		conn = net.createConnection(this.port, this.host);

		conn.on("data", function(data) {
			data = packet.decode(data);
			var type = data.type;
			debug("Recieved: ", data);
			if(type in responses) { responses[type](data, this); }
		});
	}
	this.connection = conn;
	return conn;
}

Worker.prototype.end = function() {
	var conn = this.connection;
	if(conn) { conn.end(); }
}

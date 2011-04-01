// Represents a server connection
var Connection = exports.Connection = function (hostport) {
    if (!(this instanceof Connection)) { return new Connection(hostport); }
    hostport = (hostport || "localhost:4730").split(":");
    this.host = hostport[0];
    this.port = parseInt(hostport[1], 10) || 4730;
};

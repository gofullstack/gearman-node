// Represents a server
var Server = exports.Server = function (hostport) {
    if (!(this instanceof Server)) { return new Server(hostport); }
    hostport = (hostport || "localhost:4730").split(":");
    this.host = hostport[0];
    this.port = parseInt(hostport[1], 10) || 4730;
};

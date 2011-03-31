var gearman = require("gearman"),
    Server = gearman.Server;

exports["Constructor"] = function (test) {
    test.equal(typeof Server, "function", "Server is a constructor");
    test.equal(typeof new Server(), "object", "new Server() creates an object");
    test.equal(typeof Server(), "object", "Constructor constructs without 'new'");
    test.equal(typeof gearman.createServer(), "object", "gearman.createServer() constructs");
    test.done();
};

exports["server arguments"] = function (test) {
    test.equal("test", gearman.createServer("test").host);
    test.equal(9999, gearman.createServer("test:9999").port);
    test.equal("localhost", gearman.createServer().host);
    test.equal(4730, gearman.createServer().port);

    var single = gearman.createServers("test");
    test.equal("test", single[0].host);

    var multiple = gearman.createServers(["test1", "test2"]);
    test.equal("test1", multiple[0].host);
    test.equal("test2", multiple[1].host);
    test.done();
};

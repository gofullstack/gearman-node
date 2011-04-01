var gearman = require("gearman"),
    Connection = gearman.Connection;

exports["Constructor"] = function (test) {
    test.equal(typeof Connection, "function", "Connection is a constructor");
    test.equal(typeof new Connection(), "object", "new Connection() creates an object");
    test.equal(typeof Connection(), "object", "Constructor constructs without 'new'");
    test.equal(typeof gearman.createConnection(), "object", "gearman.createConnection() constructs");
    test.done();
};

exports["server arguments"] = function (test) {
    test.equal("test", gearman.createConnection("test").host);
    test.equal(9999, gearman.createConnection("test:9999").port);
    test.equal("localhost", gearman.createConnection().host);
    test.equal(4730, gearman.createConnection().port);

    var single = gearman.createConnections("test");
    test.equal("test", single[0].host);

    var multiple = gearman.createConnections(["test1", "test2"]);
    test.equal("test1", multiple[0].host);
    test.equal("test2", multiple[1].host);
    test.done();
};

var gearman = require("gearman"),
    Client = gearman.Client;

exports["Constructor"] = function (test) {
    test.equal(typeof Client, "function", "Client is a constructor");
    test.equal(typeof new Client(), "object", "new Client() creates an object");
    test.equal(typeof Client(), "object", "Constructor constructs without 'new'");
    test.equal(typeof gearman.createClient(), "object", "gearman.createClient() constructs");
    test.done();
};

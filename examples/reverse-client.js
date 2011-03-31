var gearman = require("gearman"),
    myClient = gearman.createClient(["localhost:4730"]),
    task;

console.log("Sending job...");
task = myClient.doTask("reverse", "Hello World!");
task.on("result", function (result) {
    console.log(result);
});

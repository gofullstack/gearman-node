var Client = require("gearman").Client,
    myClient = new Client(["localhost:4730"]),
    task;

console.log("Sending job...");
task = myClient.do("reverse", "Hello World!");
task.on("result", function (result) {
    console.log(result);
});

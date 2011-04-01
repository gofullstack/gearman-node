var gearman = require("gearman"),
    myClient = gearman.createClient(["localhost:4730"]),
    job;

console.log("Sending job...");
job = myClient.submitJob("reverse", "Hello World!", "utf8");
job.on("complete", function (result) {
    console.log(result);
});

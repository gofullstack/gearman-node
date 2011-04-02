var gearman = require("gearman"),
    myClient = gearman.createClient(["localhost:4730"]),
    job;

console.log("Sending job...");
job = myClient.submitJob("reverse", "Hello World!", { encoding: "utf8" });
job.on("complete", function (result, handle) {
    console.log(result);
});

var gearman = require("gearman"),
    client = gearman.createClient();

console.log("Sending job...");
var job = client.submitJob("reverse", "Hello World!", { encoding: "utf8" });
job.on("complete", function (result) {
    console.log(result);
    client.end();
});

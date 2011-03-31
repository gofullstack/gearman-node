var gearman = require("gearman"),
    myWorker = gearman.createWorker(["localhost:4730"]);

myWorker.addAbility("reverse", function (data, job) {
    console.log("Received job: " + job.handle);
    // Reverse a string
    return String(data).split("").reverse().join("");
});

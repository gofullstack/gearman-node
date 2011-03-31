var Worker = require("gearman").Worker,
    myWorker = new Worker(["localhost:4730"]);

myWorker.addAbility("reverse", function (data, job) {
    console.log("Received job: " + job.handle);
    // Reverse a string
    return String(data).split("").reverse().join("");
});

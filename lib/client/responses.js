// Response handlers for the client

// Retuns a handler that emits data for a job
function jobEmitData(event) {
    return function (data, client) {
        var job = client.jobs[data.handle],
            d = data.data;

        if ("encoding" in job)  { d = d.toString(job.encoding); }
        job.emit(event, d);
    };
}

module.exports = {
    JOB_CREATED: function (data, client) {
        var job = client.lastJobSubmitted,
            handle = data.handle;

        client.jobs[handle] = job;
        job.handle = handle;
        job.emit("create", handle);
    },
    WORK_COMPLETE: jobEmitData("complete"),
    WORK_FAIL: function (data, client) {
        var handle = data.handle,
            job = client.jobs[handle];
        job.emit("fail", handle);
    },
    WORK_DATA: jobEmitData("data"),
    WORK_WARNING: jobEmitData("warning")
};

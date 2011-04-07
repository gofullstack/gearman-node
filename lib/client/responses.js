// Response handlers for the client

module.exports = {
    JOB_CREATED: function (data, client) {
        var job = client.lastJobSubmitted,
            handle = data.handle;

        client.jobs[handle] = job;
        job.handle = handle;
        job.emit("create", handle);
    },
    WORK_COMPLETE: function (data, client) {
        var job = client.jobs[data.handle],
            result = data.data;

        if ("encoding" in job)  { result = result.toString(job.encoding); }
        job.emit("complete", result);
    }
};

exports.names = {
    SUBMIT_JOB: 7,
    SUBMIT_JOB_HIGH: 21,
    SUBMIT_JOB_LOW: 33,
    SUBMIT_JOB_BG: 18,
    SUBMIT_JOB_HIGH_BG: 32,
    SUBMIT_JOB_LOW_BG: 34,
    GET_STATUS: 15,
    STATUS_RES: 20,
    JOB_CREATED: 8,
    WORK_COMPLETE: 13,
    WORK_FAIL: 14,
    WORK_EXCEPTION: 25,
    WORK_DATA: 28,
    WORK_WARNING: 29
};

exports.numbers = {};

// and the inverse
for (var n in exports.names) {
    if (Object.prototype.hasOwnProperty.call(exports.names, n)) {
        exports.numbers[exports.names[n]] = n;
    }
}

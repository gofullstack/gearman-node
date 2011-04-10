exports.names = {
    SUBMIT_JOB: 7,
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

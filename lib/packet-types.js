exports.names = {
    "SUBMIT_JOB": 7,
    "JOB_CREATED": 8,
    "WORK_COMPLETE": 13
};

exports.numbers = {};

// and the inverse
for (var n in exports.names) { if (exports.names.hasOwnProperty(n)) {
    exports.numbers[exports.names[n]] = n;
}};

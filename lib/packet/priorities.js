// Maps priority names to request types
exports.names = {
    low: "SUBMIT_JOB_LOW",
    normal: "SUBMIT_JOB",
    high: "SUBMIT_JOB_HIGH"
};

exports.types = {};

for (var n in exports.names) {
    if (Object.prototype.hasOwnProperty.call(exports.names, n)) {
        exports.types[exports.names[n]] = n;
    }
} 

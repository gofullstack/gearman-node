exports.names = {
    CAN_DO: 		1, // REQ
    CANT_DO:		2, // REQ
    RESET_ABILITIES:	3, // REQ
    PRE_SLEEP:		4, // REQ
    NOOP:		6, // RES
    SUBMIT_JOB: 	7, // REQ
    JOB_CREATED:	8, // RES
    GRAB_JOB:		9, // REQ
    NO_JOB:		10,// RES
    JOB_ASSIGN:		11,// REQ
    WORK_STATUS:	12,// REQ/RES
    WORK_COMPLETE:	13,// REQ/RES
    WORK_FAIL:		14,// REQ/RES
    GET_STATUS:		15,// REQ
    ECHO_REQ:		16,// REQ
    ECHO_RES:		17,// RES
    SUBMIT_JOB_BG:	18,// REQ
    ERROR:		19,// RES
    STATUS_RES:		20,// RES
    SUBMIT_JOB_HIGH: 	21,// REQ
    SET_CLIENT_ID:	22,// REQ
    CAN_DO_TIMEOUT:	23,// REQ
    ALL_YOURS:		24,// REQ
    WORK_EXCEPTION:	25,// REQ/RES
    OPTION_REQ:		26,// REQ
    OPTION_RES:		27,// RES
    WORK_DATA:		28,// REQ/RES
    WORK_WORKING:	29,// REQ/RES
    GRAB_JOB_UNIQ:	30,// REQ
    JOG_ASSIGN_UNIQ:	31,// RES
    SUBMIT_JOB_HIGH_BG:	32,// REQ
    SUBMIT_JOB_LOW:	33,// REQ
    SUBMIT_JOB_LOW_BG:	34,// REQ
    SUBMIT_JOB_SCHED:	35,// REQ -- Possibly removable
    SUBMIT_JOB_EPOCH:	36,// REQ -- Possibly removable
};

exports.numbers = {};

// and the inverse
for (var n in exports.names) {
    if (Object.prototype.hasOwnProperty.call(exports.names, n)) {
        exports.numbers[exports.names[n]] = n;
    }
}

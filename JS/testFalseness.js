const EVALUATION_STATUSES = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    ERROR: 'error',
    UNKNOWN: 'unknown',
};
function testWrong() {
    let retVal = {
        triggeredRules: [],
        ruleEvaluations:[],
        status: EVALUATION_STATUSES.UNKNOWN
    };
    if (retVal.status = EVALUATION_STATUSES.FAILURE) {
        console.log("retVal is false, inside testWrong");
    } else {
        console.log("retVal is not affected, inside testWrong");
    }
}
function testRight() {
    let retVal = {
        triggeredRules: [],
        ruleEvaluations:[],
        status: EVALUATION_STATUSES.UNKNOWN
    };
    if (retVal.status === EVALUATION_STATUSES.FAILURE) {
        console.log("retVal is false, inside testRight");
    } else {
        console.log("retVal is not affected, inside testRight");
    }
}
testWrong(); testRight();
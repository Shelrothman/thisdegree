/**
 * @description - use this file to test how the Object.assign method works
 * and how to use it to simplify the code in handleIndex when the values get assigned to res.locals
*/

let res;

let resultObj = {
    data: [{
        "Id": "c8ca533c-34e1-48ba-aef9-01e63e7d4c16",
        "Code": "DEVGLRA",
        "Name": "Dev Rule A",
        "Description": "This rule just looks for a specific name in the time entry line.",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"DEVGLRA\",\"name\":\"Dev Rule A\",\"source\":\"created\",\"createdBy\":\"curt.keisler@aderant.com\",\"description\":\"This rule just looks for a specific name in the time entry line.\",\"expression\":\"@timeEntry.narrative like \\\"DEVGLRA\\\"\",\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"Rule failed\",\"showInApp\":true,\"performEachTime\":true,\"validationPoints\":[\"timeEntry\"],\"reportRecipient\":\"timekeeper\"}],\"id\":\"c8ca533c-34e1-48ba-aef9-01e63e7d4c16\",\"created\":\"2022-01-20T15:25:51.886Z\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"like\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"timeEntry\\\",\\\"fieldPath\\\":[\\\"narrative\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"DEVGLRA\\\"}}\"}",
        "Created": "2022-01-20T15:25:51.886",
        "CreatedBy": "curt.keisler@aderant.com"
    },
    {
        "Id": "ee209357-4870-4fca-b031-021825d56a62",
        "Code": "irrelevant-groupId",
        "Name": "new rule",
        "Description": "irrelevant-description",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"irrelevant-groupId\",\"name\":\"new rule\",\"description\":\"irrelevant-description\",\"expression\":\"true\",\"actions\":[],\"createdBy\":\"-\",\"source\":\"-\",\"id\":\"ee209357-4870-4fca-b031-021825d56a62\",\"created\":\"2022-02-02T16:20:04.508Z\",\"compiledRule\":\"{\\\"type\\\":\\\"booleanConstant\\\",\\\"value\\\":true}\"}",
        "Created": "2022-02-02T16:20:04.508",
        "CreatedBy": "-"
    },
    {
        "Id": "24541890-47ee-4926-9b59-037cc075c07f",
        "Code": "irrelevant-groupId",
        "Name": "irrelevant-name",
        "Description": "irrelevant-description",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"irrelevant-groupId\",\"name\":\"irrelevant-name\",\"description\":\"irrelevant-description\",\"expression\":\"@timeEntry.workDescription==\\\"whatever\\\"\",\"active\":true,\"published\":true,\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"warning\",\"expression\":\"some warning\",\"showInApp\":true,\"performEachTime\":true,\"validationPoints\":[\"timeEntry\"],\"reportRecipient\":\"none\"}],\"created\":\"2022-05-11T10:41:36.405Z\",\"createdBy\":\"-\",\"source\":\"-\",\"id\":\"24541890-47ee-4926-9b59-037cc075c07f\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"equality\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"timeEntry\\\",\\\"fieldPath\\\":[\\\"workDescription\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"whatever\\\"}}\"}",
        "Created": "2022-05-11T10:41:36.405",
        "CreatedBy": "-"
    },
    {
        "Id": "804d8a30-c75f-48e0-98ef-04f62c411255",
        "Code": "CURT",
        "Name": "Has Narrative",
        "Description": "Has Narrative",
        "Active": "1",
        "Published": "1",
        "Data": "{\"id\":\"804d8a30-c75f-48e0-98ef-04f62c411255\",\"code\":\"CURT\",\"name\":\"Has Narrative\",\"description\":\"Has Narrative\",\"active\":true,\"published\":true,\"expression\":\"@lineItem.lineItemDescription > \\\"\\\"\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"greaterThan\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"lineItem\\\",\\\"fieldPath\\\":[\\\"lineItemDescription\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"\\\"}}\",\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"All narratives must be blank. We aren't telling anyone anything about what we are doing. Nadda.\",\"showInApp\":true,\"performEachTime\":true,\"reportRecipient\":\"timekeeperAndBiller\",\"validationPoints\":[\"timeEntry\"]}],\"createdBy\":\"curt.keisler@aderant.com\",\"source\":\"created\",\"created\":\"2022-02-07T16:10:18.168Z\"}",
        "Created": "2022-02-07T16:10:18.168",
        "CreatedBy": "curt.keisler@aderant.com"
    },
    {
        "Id": "d5c20128-0a43-4ebe-b7f0-057a1cb50981",
        "Code": "DEVGLRA",
        "Name": "Dev Rule A",
        "Description": "description",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"DEVGLRA\",\"name\":\"Dev Rule A\",\"source\":\"created\",\"createdBy\":\"curt.keisler@aderant.com\",\"description\":\"description\",\"expression\":\"@timeEntry.narrative like \\\"miguel\\\"\",\"actions\":[],\"id\":\"d5c20128-0a43-4ebe-b7f0-057a1cb50981\",\"created\":\"2022-01-20T15:37:14.802Z\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"like\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"timeEntry\\\",\\\"fieldPath\\\":[\\\"narrative\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"miguel\\\"}}\"}",
        "Created": "2022-01-20T15:37:14.802",
        "CreatedBy": "curt.keisler@aderant.com"
    },
    {
        "Id": "f0560bfc-aebe-4449-9192-05e0828ca9ce",
        "Code": "irrelevant-groupId",
        "Name": "new rule",
        "Description": "irrelevant-description",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"irrelevant-groupId\",\"name\":\"new rule\",\"description\":\"irrelevant-description\",\"expression\":\"true\",\"active\":true,\"published\":true,\"actions\":[],\"created\":\"2022-05-12T16:30:38.527Z\",\"createdBy\":\"-\",\"source\":\"-\",\"id\":\"f0560bfc-aebe-4449-9192-05e0828ca9ce\",\"compiledRule\":\"{\\\"type\\\":\\\"booleanConstant\\\",\\\"value\\\":true}\"}",
        "Created": "2022-05-12T16:30:38.527",
        "CreatedBy": "-"
    },
    {
        "Id": "1b3d5796-cf49-4e82-b91b-06bc528a556d",
        "Code": "BLK003",
        "Name": "Bill Rule Check Matter Id by JYF",
        "Description": "Make sure this rule only trigger on specific matterId",
        "Active": "1",
        "Published": "1",
        "Data": "{\"id\":\"1b3d5796-cf49-4e82-b91b-06bc528a556d\",\"code\":\"BLK003\",\"name\":\"Bill Rule Check Matter Id by JYF\",\"description\":\"Make sure this rule only trigger on specific matterId\",\"active\":true,\"published\":true,\"expression\":\"@bill.billOfficeCode == \\\"TLH\\\" and anyItems(@bill.clients, anyItems(@row.matters, @row.id == 100346))\",\"compiledRule\":\"{\\\"type\\\":\\\"andOperator\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"equality\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"bill\\\",\\\"fieldPath\\\":[\\\"billOfficeCode\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"TLH\\\"}},\\\"rightOperand\\\":{\\\"type\\\":\\\"itemFunction\\\",\\\"name\\\":\\\"anyItems\\\",\\\"fieldIdentifier\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"bill\\\",\\\"fieldPath\\\":[\\\"clients\\\"]},\\\"rule\\\":{\\\"type\\\":\\\"itemFunction\\\",\\\"name\\\":\\\"anyItems\\\",\\\"fieldIdentifier\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"row\\\",\\\"fieldPath\\\":[\\\"matters\\\"]},\\\"rule\\\":{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"equality\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"row\\\",\\\"fieldPath\\\":[\\\"id\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"numberConstant\\\",\\\"value\\\":100346}}}}}\",\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"Has been triggered on this matter\",\"showInApp\":true,\"performEachTime\":true,\"reportRecipient\":\"none\",\"validationPoints\":[\"billing\"]}],\"createdBy\":\"jingyuan.fang@aderant.com\",\"source\":\"created\",\"created\":\"2022-02-25T02:58:31.414Z\"}",
        "Created": "2022-02-25T02:58:31.414",
        "CreatedBy": "jingyuan.fang@aderant.com"
    },
    {
        "Id": "f761966c-1d8f-498e-ac47-07407c62a13c",
        "Code": "TEST_KK5",
        "Name": "Check time entry",
        "Description": "Check if miguel string is in the narrative",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"TEST_KK5\",\"name\":\"Check time entry\",\"description\":\"Check if miguel string is in the narrative\",\"expression\":\"@timeEntry.narrative==\\\"miguelooo\\\"\",\"active\":true,\"published\":true,\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"\\\"Rule failed.\\\"\",\"showInApp\":true,\"performEachTime\":true,\"validationPoints\":[\"timeEntry\"],\"reportRecipient\":\"none\"}],\"created\":\"2021-08-20T18:51:04.222Z\",\"createdBy\":\"dg2@aderant.com\",\"source\":\"nada\",\"id\":\"f761966c-1d8f-498e-ac47-07407c62a13c\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"equality\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"timeEntry\\\",\\\"fieldPath\\\":[\\\"narrative\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"miguelooo\\\"}}\"}",
        "Created": "2021-08-20T18:51:04.222",
        "CreatedBy": "dg2@aderant.com"
    },
    {
        "Id": "9c17b660-1a1b-4d3d-9574-0886d1414da3",
        "Code": "_EX008",
        "Name": "containsLike() Example ",
        "Description": "Illustrates how to use the containsLike() function. The first below shows looking for text within a value. The second where it starts with a value.\r\nThe third shows within a field.",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"_EX008\",\"name\":\"containsLike() Example \",\"description\":\"Illustrates how to use the containsLike() function. The first below shows looking for text within a value. The second where it starts with a value.\\r\\nThe third shows within a field.\",\"expression\":\"containsLike(\\\"This is a test\\\",\\\"%test%\\\")\\r\\nor\\r\\ncontainsLike(\\\"This is a test\\\",\\\"This%\\\")\\r\\nor\\r\\ncontainsLike(@lineItem.lineItemDescription,\\\"%Info%\\\")\",\"active\":true,\"published\":true,\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"\\\"Rule failed.\\\"\",\"showInApp\":true,\"performEachTime\":true,\"validationPoints\":[\"timeEntry\"],\"reportRecipient\":\"none\"}],\"created\":\"2022-03-03T17:22:20.195Z\",\"createdBy\":\"-\",\"source\":\"-\",\"id\":\"9c17b660-1a1b-4d3d-9574-0886d1414da3\",\"compiledRule\":\"{\\\"type\\\":\\\"orOperator\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"orOperator\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"containsLike\\\",\\\"expression\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"This is a test\\\"},\\\"list\\\":{\\\"type\\\":\\\"expressionList\\\",\\\"value\\\":[{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"%test%\\\"}]}},\\\"rightOperand\\\":{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"containsLike\\\",\\\"expression\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"This is a test\\\"},\\\"list\\\":{\\\"type\\\":\\\"expressionList\\\",\\\"value\\\":[{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"This%\\\"}]}}},\\\"rightOperand\\\":{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"containsLike\\\",\\\"expression\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"lineItem\\\",\\\"fieldPath\\\":[\\\"lineItemDescription\\\"]},\\\"list\\\":{\\\"type\\\":\\\"expressionList\\\",\\\"value\\\":[{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"%Info%\\\"}]}}}\"}",
        "Created": "2022-03-03T17:22:20.195",
        "CreatedBy": "-"
    },
    {
        "Id": "3a354f83-f0b4-443a-9a7c-08b5aa24c49f",
        "Code": "irrelevant-groupId",
        "Name": "irrelevant-name",
        "Description": "irrelevant-description",
        "Active": "1",
        "Published": "1",
        "Data": "{\"code\":\"irrelevant-groupId\",\"name\":\"irrelevant-name\",\"description\":\"irrelevant-description\",\"expression\":\"@timeEntry.workDescription==\\\"testbla\\\"\",\"active\":true,\"published\":true,\"actions\":[{\"actionType\":\"showWarningError\",\"messageType\":\"error\",\"expression\":\"Rule failed\",\"showInApp\":true,\"performEachTime\":true,\"validationPoints\":[\"timeEntry\"],\"reportRecipient\":\"none\"}],\"created\":\"2022-02-10T16:59:19.077Z\",\"createdBy\":\"-\",\"source\":\"-\",\"id\":\"3a354f83-f0b4-443a-9a7c-08b5aa24c49f\",\"compiledRule\":\"{\\\"type\\\":\\\"relationalExpression\\\",\\\"relation\\\":\\\"equality\\\",\\\"leftOperand\\\":{\\\"type\\\":\\\"fieldIdentifier\\\",\\\"objectName\\\":\\\"timeEntry\\\",\\\"fieldPath\\\":[\\\"workDescription\\\"]},\\\"rightOperand\\\":{\\\"type\\\":\\\"stringConstant\\\",\\\"value\\\":\\\"testbla\\\"}}\"}",
        "Created": "2022-02-10T16:59:19.077",
        "CreatedBy": "-"
    },],
    meta: {
        status: 200,
        totalRows: 2,
        sortDirection: 'ASC',
        searchColumnName: 'Code',
        page: 1,
        pageSize: 10,
    }
}

function assignToLocals(obj) {
    // let localObj = {};
    res = Object.assign({}, obj);
    // return localObj;
    // res.locals = localObj;
}

// console.log(assignToLocals(resultObj));

assignToLocals(resultObj);

console.log(res);
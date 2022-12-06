let recordsToDisplay = [
    {
        PartitionKey: "0f9d8d09-56a4-4c57-b6f1-e6ae3918c1a9",
        RowKey: "",
        Timestamp: "2022-02-21T21:45:32.3319504Z",
        code: "BILLAK",
        name: "Auckland bill",
        description: "r",
        validationPoint: "billing",
        createdBy: "kalpana.lala@aderant.com",
        blobId: "783bbb5e-e9a2-4c5a-8257-7b0c89c685bb",
    },
    {
        PartitionKey: "16ab5a94-1201-4771-a3c7-a3f0a12f76fb",
        RowKey: "",
        Timestamp: "2022-11-17T18:40:57.2766674Z",
        code: "e_irrelevant_sample ",
        name: "another irrelevant sample",
        description: "another irrelevant sample",
        validationPoint: "billDisbEntry",
        createdBy: "shelby.rothman@aderant.com",
        blobId: "24888941-717f-4e08-a921-5819d75ba43d",
    },
    {
        PartitionKey: "19b67851-343f-46e0-af00-f19f98ae18e3",
        RowKey: "",
        Timestamp: "2022-09-21T20:52:42.9398609Z",
        code: "sr_test",
        name: "test data 2",
        description: "irrelevant",
        validationPoint: "timeEntry",
        createdBy: "shelby.rothman@aderant.com",
        blobId: "198ec039-57f3-4114-84ed-57c198f5073e",
    },
    {
        PartitionKey: "1d0913d7-68b5-451e-8324-ab99c7645e28",
        RowKey: "",
        Timestamp: "2022-01-20T20:30:39.5819648Z",
        code: "DEV001",
        name: "Test",
        description: "test",
        validationPoint: "timeEntry",
        createdBy: "",
        blobId: "aded9f79-843a-4395-b6cb-1548ff4688f0",
    },
    {
        PartitionKey: "25fcf018-c939-4a5b-874c-fe7cad8ed099",
        RowKey: "",
        Timestamp: "2022-11-17T18:40:03.4606614Z",
        code: "d_irrelevant_sample_2",
        name: "does nothing",
        description: "fake data for dev",
        validationPoint: "billTimeEntry",
        createdBy: "shelby.rothman@aderant.com",
        blobId: "911c012b-c564-4085-9dff-d1ccdad871e7",
    },
    {
        PartitionKey: "457138d2-db4a-4362-bdab-64d4d5f6a0d6",
        RowKey: "",
        Timestamp: "2022-11-17T18:35:34.4876795Z",
        code: "another_irrelevant_sample",
        name: "data_1_nothing",
        description: "fake data for dev",
        validationPoint: "expenseEntry",
        createdBy: "shelby.rothman@aderant.com",
        blobId: "057a7881-88d6-4482-9055-7e4d819458e1",
    },
    {
        PartitionKey: "4a1442b2-67e0-4176-8945-fd622c5dde67",
        RowKey: "",
        Timestamp: "2022-08-17T19:29:05.9170241Z",
        code: "Expert_test",
        name: "Expert Integration Test Data",
        description: "Expert Integration Test Data",
        validationPoint: "billing",
        createdBy: "anupama.kapilavai@aderant.com",
        blobId: "7c7ef091-94cf-45c9-8e40-dcc829e93b4f",
    },
    {
        PartitionKey: "503711f9-c8af-4185-a36b-33ee524b1fd6",
        RowKey: "",
        Timestamp: "2022-09-13T19:45:31.51682Z",
        code: "_CK000",
        name: "Curt's Sample",
        description: "Got this from Expert team. Checking it out",
        validationPoint: "timeEntry",
        createdBy: "curt.keisler@aderant.com",
        blobId: "5a170771-8c8c-42ac-8ada-936b9ebd7e58",
    },
    {
        PartitionKey: "5eb5e91c-ae00-45fb-b285-03d040d255ec",
        RowKey: "",
        Timestamp: "2022-04-11T15:54:11.7661408Z",
        code: "Nothing",
        name: "Nothing",
        description: "Nothing",
        validationPoint: "timeEntry",
        createdBy: "curt.keisler@aderant.com",
        blobId: "37b61777-21fc-4645-b002-681b894e4a26",
    },
    {
        PartitionKey: "71d6ac88-7329-4a69-ac16-8d9b960c0c21",
        RowKey: "",
        Timestamp: "2022-11-17T18:36:41.5210232Z",
        code: "b_irrelevant_sample",
        name: "test data does nothing",
        description: "test data does nothing",
        validationPoint: "billDisbEntry",
        createdBy: "shelby.rothman@aderant.com",
        blobId: "b5a44d0e-c388-46ca-937c-2c1a1dad5ed8",
    },
]

/**
 * @function dynamicSort - sorts based on query params or default-value
 * works with string and number type properties
 * ? what about special characters?
 */
function dynamicSort(property, direction) {
    var sortOrder = direction === "ASC" ? 1 : -1;
    let localProperty = property.toLowerCase();
    return function (a, b) {
        var result = (a[localProperty] < b[localProperty]) ? -1 : (a[localProperty] > b[localProperty]) ? 1 : 0;
        return result * sortOrder;
    }
}

// console.log("sorted by code ASC", recordsToDisplay.sort(dynamicSort('Code', 'ASC')));

// sort the recordsToDisplay in ascending alphabetical order by code, return just the code property
// console.log("sorted by code ASC", recordsToDisplay.sort(dynamicSort('Code', 'ASC')).map(record => record.code));
// console.log(recordsToDisplay["code"].sort())

const sortedArray = recordsToDisplay.sort((a, b) => {
    let fa = a.code.toLowerCase(),
        fb = b.code.toLowerCase();
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});

console.log(sortedArray);
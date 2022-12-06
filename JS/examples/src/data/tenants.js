/**
 * mocking data here to focus on routing and other logic than data fetching
 * todo / future - fetch data from server the way og app does
 * 
 * this mimicks the table in azure table storage the Tenants table (https://aderantcompliancedev.table.core.windows.net/Tenants)
 */

let tenants = [
    {
        "PartitionKey": "acctenantusdev",
        "RowKey": "",
        "Timestamp": "2022-05-09T18:45:17.3387485Z",
        "ApiSecret": "556000",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Server=tcp:acctenantusdev.database.windows.net,1433;Initial Catalog=acctenantusdev;Persist Security Info=False;User ID=sqladmin;Password=Cd644094d4384cd3aa1cdd6e60273dda;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "Aderant US Dev Environment",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=acctenantusdev;AccountKey=qEejVudWfyr/E6AMVku19Aidw7n+s2HdwyCXlNtkwu8n+d3Gm/Gv5pgCHV5cUVQ9+gzSEHtOMmLulXyGx/SL2g==;EndpointSuffix=core.windows.net",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "bb",
        "RowKey": "",
        "Timestamp": "2022-05-09T18:18:43.7405595Z",
        "ApiSecret": "63456345",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accbbusdev.database.windows.net;Initial Catalog=accbbusdev;User ID=adminbb;Password=477cSC7f43ubWiXxnGLDdIyOmjwHc6WR;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "Bill Blast Dev",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accbbusdev;AccountKey=jvZ0WJFmCQoETwPUTlOj2dwgqaBQ2tBcmjYYmoy78kIQGV9W9TqlkyDJIQEFdh76E3V8j56S2fftGQiqBCgX1g==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "cwk",
        "RowKey": "",
        "Timestamp": "2022-05-11T20:48:11.9944507Z",
        "ApiSecret": "534534",
        "ApiSecret@type": "String",
        "AzureLocation": "",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=acccwkusdev.database.windows.net;Initial Catalog=acccwkusdev;User ID=admincwk;Password=TZFzivoe6Qrm7TwBgorbou31ZvJJyD8a;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Implementation",
        "DeploymentStatus@type": "String",
        "DisplayName": "cwk",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=acccwkusdev;AccountKey=OHtZb+EHsUuUBuLP7jBU6J/Re4ztkQpxh5LXD/ZvVm2kh1TG0kTTEMfWootWMZe7mow/rVe+0B2VWSRAboX5IA==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "cwk2",
        "RowKey": "",
        "Timestamp": "2022-05-13T18:26:08.0335441Z",
        "ApiSecret": "5432345",
        "ApiSecret@type": "String",
        "AzureLocation": "",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=acccwk2usdev.database.windows.net;Initial Catalog=acccwk2usdev;User ID=admincwk2;Password=IGtvVCgr2Xb5mthPqs2RJtbj02bXlRzQ;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Implementation",
        "DeploymentStatus@type": "String",
        "DisplayName": "cwk2",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=acccwk2usdev;AccountKey=hH4+DoFrpf5Lk5BY+K/BhPNbFoHsmJLXR9kZ3PUzxIG440c3JF/+BWZ4XcOYJJL950bwS2kXNZkLLPwHW+fXEA==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "expert",
        "RowKey": "",
        "Timestamp": "2022-05-09T17:57:16.3738743Z",
        "ApiSecret": "54356",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accexpertusdev.database.windows.net;Initial Catalog=accexpertusdev;User ID=adminexpert;Password=VtzOE7e62HdcsgovOSIGI6uaBtYcL5DH;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "Expert Development",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accexpertusdev;AccountKey=CIwMYCru5Jax8S/W8ZPEqBMMZg8D3dtI14FinvxBu4iIVTlNENaho8DN4zPAYNw9qC2eGsdJicYRfgg6ujtVyw==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "lib",
        "RowKey": "",
        "Timestamp": "2022-05-24T15:55:28.1881726Z",
        "ApiSecret": "6543654",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=acclibusdev.database.windows.net;Initial Catalog=acclibusdev;User ID=adminlib;Password=HRBRG655YWEaGuWUSb8fQRJXgbY4tXxE;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Production",
        "DeploymentStatus@type": "String",
        "DisplayName": "Aderant Rules Library",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=acclibusdev;AccountKey=w+bsMOt6qv5gLJci2+hQyI4znwKlNuki9C/k67ILmKkjPwewx19WvHIGZ6UebVZ/gimlSp8YQuw1jP38jEQB+w==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "ocg",
        "RowKey": "",
        "Timestamp": "2022-05-09T18:19:02.2660377Z",
        "ApiSecret": "554634",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accocgusdev.database.windows.net;Initial Catalog=accocgusdev;User ID=adminocg;Password=C8XqaTbs3Lzg8R6gH1IFjAAWBr79gxB3;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "OCG Dev",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accocgusdev;AccountKey=+45zutTXKPYrFaeJbNqLdNkk/0rVD4Db5Z1AOOaar4zrP17u3s6rRMZbixs4nxyIFpnnHQQONNp3YExEC3gIQw==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "ocgqa",
        "RowKey": "",
        "Timestamp": "2022-07-14T15:37:20.8190562Z",
        "ApiSecret": "666634",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accocgqausdev.database.windows.net;Initial Catalog=accocgqausdev;User ID=adminocgqa;Password=NGg3mZEsXkVlhA4G1IBB4oASshKpHeGF;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "QA",
        "DeploymentStatus@type": "String",
        "DisplayName": "OCG QA",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accocgqausdev;AccountKey=JOdslhsikdvwMYwqFtc5VYiX6t+UhK0eJG8Qw1QLPi5GJ+Ft66a9NYhbZrJtbZt3l7+F/FQPx8ap+ASt03ytOg==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "ocgut",
        "RowKey": "",
        "Timestamp": "2022-07-14T15:37:46.5234155Z",
        "ApiSecret": "899642",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accocgutusdev.database.windows.net;Initial Catalog=accocgutusdev;User ID=adminocgut;Password=m6qNM0cXrRj06gYu9ORDYTyHLBsAsamy;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "OCG Unit Testing",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accocgutusdev;AccountKey=7YmJJ+u7nCkI71zk5b5qL6VlC402ZgDAajfvqOmHLpOFhsjZfBfHTijS8qj9fI7BwKpB7NeiStcj+AStyCFaCg==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "perfdev",
        "RowKey": "",
        "Timestamp": "2022-05-09T19:49:14.0612936Z",
        "ApiSecret": "55525363",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accperfdevusdev.database.windows.net;Initial Catalog=accperfdevusdev;User ID=adminperfdev;Password=kRx59UiDkKVE04CiujQywVmX0dL4t66y;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "Performance",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accperfdevusdev;AccountKey=xENKqJLaZbqr7fiYPkp89s357GxbN3NJGvxkuRWZNXXQ/yCNsBdVbltqQ5CiH/0W/H3HCCWtuX6wDqO0RBxsQA==;",
        "StorageConnectionString@type": "String"
    },
    {
        "PartitionKey": "sr",
        "RowKey": "",
        "Timestamp": "2022-06-29T14:54:25.4143213Z",
        "ApiSecret": "890897000000",
        "ApiSecret@type": "String",
        "AzureLocation": "eastus2",
        "AzureLocation@type": "String",
        "DbConnectionString": "Data source=accsrusdev.database.windows.net;Initial Catalog=accsrusdev;User ID=adminsr;Password=Ot5oYcVgxB7H4SxLFWKE26eJ5kvzfU4U;",
        "DbConnectionString@type": "String",
        "DeploymentStatus": "Development",
        "DeploymentStatus@type": "String",
        "DisplayName": "Shelby's Dev Tenancy",
        "DisplayName@type": "String",
        "Settings": "{}",
        "Settings@type": "String",
        "StorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=accsrusdev;AccountKey=Plumb2Rm3XSJ3aF7sSc8Mm2XiPkZe0ILMIdSAPYhkfqpvGms7SYb/5hLICuewvfWVvjtDkZcWP7MojXpS8TZuA==;",
        "StorageConnectionString@type": "String"
    }
]

export function getTenants() {
    return tenants;
}

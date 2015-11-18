# aws-discovery-service-nodejs

Add to yuor container definition
```
"containerDefinitions": [
...,
{
    "name": "service-discovery",
    "image": "quay.io/clickberry/aws-discovery-service-nodejs:v0.0.1",
    "cpu": 2
    "memory": 100,
    "environment": [
        {
            "name": "CLUSTERNAME",
            "value": "qa"
        },
        {
            "name": "HOSTNAME",
            "value": "test-mpngo"
        },
        {
            "name": "DOMAINNAME",
            "value": "db.io"
        },
        {
            "name": "SERVICENAME",
            "value": "test-mongo-service"
        },
        {
            "name": "REGION",
            "value": "us-west-1"
        }
    ]
  }
]
```

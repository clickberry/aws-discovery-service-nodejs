# aws-discovery-service-nodejs

Add to yuor container definition
```
{
    "family": "qa-auth-mongo",
    "containerDefinitions": [
        {
            "name": "mongo",
            "image": "mongo:3.1",
            "cpu": 100,
            "memory": 200,
            "essential": true,
            "portMappings": [
                {
                    "hostPort": 27017,
                    "containerPort": 27017,
                    "protocol": "tcp"
                }
            ],
            "command": [
                "--storageEngine=wiredTiger"
            ]
        },
        {
            "name": "service-discovery",
            "image": "quay.io/clickberry/aws-discovery-service-nodejs:v0.0.1",
            "cpu": 2
            "memory": 100,
            "essential": false,
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
}
```

# aws-discovery-service-nodejs

Add to yuor container definition
```
{
    ...
    "containerDefinitions": [
        ...
        {
            "name": "service-discovery",
            "image": "quay.io/clickberry/aws-discovery-service-nodejs:v0.0.1",
            "cpu": 2,
            "memory": 100,
            "essential": false,
            "environment": [
                {
                    "name": "CLUSTERNAME",
                    "value": **"[cluster_name]"**
                },
                {
                    "name": "HOSTNAME",
                    "value": "*[host_name]*"
                },
                {
                    "name": "DOMAINNAME",
                    "value": "*[domain_name]*"
                },
                {
                    "name": "SERVICENAME",
                    "value": "*[service_name]*"
                },
                {
                    "name": "REGION",
                    "value": "*[region]*"
                }
            ]
      }
    ]
}
```

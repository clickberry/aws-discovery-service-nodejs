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
                    "value": "[cluster_name]"
                },
                {
                    "name": "HOSTNAME",
                    "value": "[host_name]"
                },
                {
                    "name": "DOMAINNAME",
                    "value": "[domain_name]"
                },
                {
                    "name": "SERVICENAME",
                    "value": "[service_name]"
                },
                {
                    "name": "REGION",
                    "value": "[region]"
                }
            ]
      }
    ]
}
```

* *cluster_name* - name of your ecs cluster
* *domain_name* - domain name of your private hosted zone
* *host_name* - host name for your container application
* *region* - region of your VPC (Virtual Private Clouds)
* *service_name* - name of your ecs service

Before executing discovery service, in your hosted zone will adding record A type:
*[host_name].[domain_name]* *[ip_address]*

* *ip_address* - ip address of instance where running this application

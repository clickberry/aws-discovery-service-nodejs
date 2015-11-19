# aws-discovery-service-nodejs

## Description
This service allow you link containers located on different instances in one VPC(Virtual Private Clouds) by their host name, which automaticaly set A record to your private hosted zone(by means AWS Route53).

If container will restarting on another instance, then record also updates with new ip address, but with same host name.

## Settings
### Created private Hosted Zone
Create private Hosted Zone in AWS Route53 with same VPC that your EC2 instances and *domain_name*.

### Configure Task Definition
Add to yuor "Task Definition" of your ecs application:
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

* *cluster_name* - name of your ecs cluster.
* *domain_name* - domain name of your private hosted zone. *Ex. contoso.io*
* *host_name* - host name for your container application. *Ex. mongo.test*
* *region* - region of your VPC (Virtual Private Clouds). *Ex. us-west-1*
* *service_name* - name of your ecs service

After executing discovery service, in your hosted zone will added record A type:

*[host_name].[domain_name]* --- *[ip_address]*    
* *ip_address* - ip address of instance where running your application

Example:

*mongo.test.contoso.io --- 172.23.54.22*

### Configure credentials
The discovery service needs credentials for correct work. You should set policy for instance role in AWS IAM:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:ListTasks",
                "ecs:DescribeTasks",
                "ecs:DescribeContainerInstances",
                "ec2:DescribeInstances",
                "route53:ListHostedZonesByName",
                "route53:ChangeResourceRecordSets"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

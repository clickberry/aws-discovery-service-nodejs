var config = require('./config');
var AWS = require('aws-sdk');

AWS.config = new AWS.Config({
    region: config.get('region')
});

var route53 = new AWS.Route53({apiVersion: '2013-04-01'});
var ecs = new AWS.ECS({apiVersion: '2014-11-13'});
var ec2 = new AWS.EC2({apiVersion: '2015-10-01'});


var params = {
    cluster: config.get('clusterName'),
    serviceName: config.get('serviceName')
};
ecs.listTasks(params, function (err, data) {
    if (err) {
        return console.log(err, err.stack);
    }

    console.log(data);           // successful response

    var params = {
        cluster: config.get('clusterName'),
        tasks: [data.taskArns[0]]
    };

    ecs.describeTasks(params, function (err, data) {
        if (err) {
            return console.log(err, err.stack);
        }

        console.log(data);

        var params = {
            cluster: config.get('clusterName'),
            containerInstances: [data.tasks[0].containerInstanceArn]
        };
        ecs.describeContainerInstances(params, function (err, data) {
            if (err) {
                return console.log(err, err.stack);
            }

            console.log(data);

            var params = {
                InstanceIds: [data.containerInstances[0].ec2InstanceId]
            };
            ec2.describeInstances(params, function (err, data) {
                if (err) {
                    return console.log(err, err.stack);
                }

                var network = data.Reservations[0].Instances[0].NetworkInterfaces[0];
                console.log(network);
                console.log(network.PrivateIpAddress);

                var params = {
                    DNSName: config.get('domainName')
                };
                route53.listHostedZonesByName(params, function (err, data) {
                    if (err) {
                        return console.log(err, err.stack);
                    }

                    console.log(data);           // successful response
                    var zoneId = data.HostedZones[0].Id.split('/').pop();
                    console.log(zoneId);

                    var params = {
                        ChangeBatch: {
                            Changes: [
                                {
                                    Action: 'UPSERT',
                                    ResourceRecordSet: {
                                        Name: (config.get('hostName') || config.get('serviceName')) + '.' + config.get('domainName'),
                                        Type: 'A',
                                        ResourceRecords: [
                                            {
                                                Value: network.PrivateIpAddress /* required */
                                            }
                                        ],
                                        TTL: 20
                                    }
                                }
                            ]
                        },
                        HostedZoneId: zoneId
                    };
                    route53.changeResourceRecordSets(params, function (err, data) {
                        if (err) {
                            return console.log(err, err.stack);
                        }

                        console.log(data);
                    });
                });
            });
        });
    });
});
const cdk = require('@aws-cdk/core');
import { Vpc } from "@aws-cdk/aws-ec2";
import { EcsClusterHandler } from "./ecs-cluster-handler";
import { EcsServiceHandler } from "./ecs-service-handler";
import { ElbHandler } from "./elb-handler";

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-ecs-integ-ecs');

// so pra nao criar uma classe VPC
const vpc = new Vpc(stack, 'Vpc', { maxAzs: 2 }); 

const cluster = EcsClusterHandler.createCluster(stack, vpc);

const serviceHandler = new EcsServiceHandler(stack);
const taskDefinition = serviceHandler.createTaskDefinition();
const service = serviceHandler.createService(cluster, taskDefinition);

const elbHandler = new ElbHandler();
const elb = elbHandler.createElb(stack, vpc);
elbHandler.createListener(elb, service);

new cdk.CfnOutput(stack, 'LoadBalancerDNS', { value: elb.loadBalancerDnsName, });

app.synth();
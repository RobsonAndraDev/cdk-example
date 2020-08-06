import { Construct } from "@aws-cdk/core";
import { 
  Ec2TaskDefinition, ContainerImage, Protocol, 
  ICluster, Ec2Service, TaskDefinition 
} from "@aws-cdk/aws-ecs";

export class EcsServiceHandler {
  private stack: Construct;
  
  constructor(stack: Construct) {
    this.stack = stack;
  }
  
  createTaskDefinition() {
    // Create Task Definition
    const taskDefinition = new Ec2TaskDefinition(this.stack, 'TaskDef');
    const container = taskDefinition.addContainer('web', {
      image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      memoryLimitMiB: 256,
    });
    
    container.addPortMappings({
      containerPort: 80,
      hostPort: 8080,
      protocol: Protocol.TCP
    });

    return taskDefinition;
  }

  createService(cluster: ICluster, taskDefinition: TaskDefinition ) {
    // Create Service
    const service = new Ec2Service(this.stack, "Service", {
      cluster,
      taskDefinition,
    });

    return service;
  }
}
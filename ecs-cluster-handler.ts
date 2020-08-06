import { Construct } from '@aws-cdk/core';
import { Cluster } from '@aws-cdk/aws-ecs';
import { 
  InstanceType, InstanceClass, InstanceSize, IVpc 
} from '@aws-cdk/aws-ec2';

export class EcsClusterHandler {
  static createCluster(stack: Construct, vpc: IVpc) {
    const cluster = new Cluster(stack, 'EcsCluster', { vpc });
    
    cluster.addCapacity('DefaultAutoScalingGroup', {
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO)
    });

    return cluster;
  }
}

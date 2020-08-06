import { Construct, Duration } from "@aws-cdk/core";
import { IVpc } from "@aws-cdk/aws-ec2";
import { ApplicationLoadBalancer } from "@aws-cdk/aws-elasticloadbalancingv2";
import { BaseService } from "@aws-cdk/aws-ecs";

export class ElbHandler {
  createElb(stack: Construct, vpc: IVpc) {
    // Create ALB
    const lb = new ApplicationLoadBalancer(stack, 'LB', {
      vpc,
      internetFacing: true
    });

    return lb;
  }

  createListener(lb: ApplicationLoadBalancer, service: BaseService) {
    const listener = lb.addListener('PublicListener', { port: 80, open: true });
    
    // Attach ALB to ECS Service
    listener.addTargets('ECS', {
      port: 80,
      targets: [service.loadBalancerTarget({
        containerName: 'web',
        containerPort: 80
      })],
      // include health check (default is none)
      healthCheck: {
        interval: Duration.seconds(60),
        path: "/health",
        timeout: Duration.seconds(5),
      }
    });

    return listener;
  }
}


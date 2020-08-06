"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElbHandler = void 0;
const core_1 = require("@aws-cdk/core");
const aws_elasticloadbalancingv2_1 = require("@aws-cdk/aws-elasticloadbalancingv2");
class ElbHandler {
    createElb(stack, vpc) {
        // Create ALB
        const lb = new aws_elasticloadbalancingv2_1.ApplicationLoadBalancer(stack, 'LB', {
            vpc,
            internetFacing: true
        });
        return lb;
    }
    createListener(lb, service) {
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
                interval: core_1.Duration.seconds(60),
                path: "/health",
                timeout: core_1.Duration.seconds(5),
            }
        });
        return listener;
    }
}
exports.ElbHandler = ElbHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxiLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBb0Q7QUFFcEQsb0ZBQThFO0FBRzlFLE1BQWEsVUFBVTtJQUNyQixTQUFTLENBQUMsS0FBZ0IsRUFBRSxHQUFTO1FBQ25DLGFBQWE7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLG9EQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDbEQsR0FBRztZQUNILGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUEyQixFQUFFLE9BQW9CO1FBQzlELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVFLDRCQUE0QjtRQUM1QixRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUN6QixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbkMsYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLGFBQWEsRUFBRSxFQUFFO2lCQUNsQixDQUFDLENBQUM7WUFDSCx5Q0FBeUM7WUFDekMsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBL0JELGdDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCwgRHVyYXRpb24gfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgSVZwYyB9IGZyb20gXCJAYXdzLWNkay9hd3MtZWMyXCI7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvYWRCYWxhbmNlciB9IGZyb20gXCJAYXdzLWNkay9hd3MtZWxhc3RpY2xvYWRiYWxhbmNpbmd2MlwiO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWVjc1wiO1xuXG5leHBvcnQgY2xhc3MgRWxiSGFuZGxlciB7XG4gIGNyZWF0ZUVsYihzdGFjazogQ29uc3RydWN0LCB2cGM6IElWcGMpIHtcbiAgICAvLyBDcmVhdGUgQUxCXG4gICAgY29uc3QgbGIgPSBuZXcgQXBwbGljYXRpb25Mb2FkQmFsYW5jZXIoc3RhY2ssICdMQicsIHtcbiAgICAgIHZwYyxcbiAgICAgIGludGVybmV0RmFjaW5nOiB0cnVlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGI7XG4gIH1cblxuICBjcmVhdGVMaXN0ZW5lcihsYjogQXBwbGljYXRpb25Mb2FkQmFsYW5jZXIsIHNlcnZpY2U6IEJhc2VTZXJ2aWNlKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBsYi5hZGRMaXN0ZW5lcignUHVibGljTGlzdGVuZXInLCB7IHBvcnQ6IDgwLCBvcGVuOiB0cnVlIH0pO1xuICAgIFxuICAgIC8vIEF0dGFjaCBBTEIgdG8gRUNTIFNlcnZpY2VcbiAgICBsaXN0ZW5lci5hZGRUYXJnZXRzKCdFQ1MnLCB7XG4gICAgICBwb3J0OiA4MCxcbiAgICAgIHRhcmdldHM6IFtzZXJ2aWNlLmxvYWRCYWxhbmNlclRhcmdldCh7XG4gICAgICAgIGNvbnRhaW5lck5hbWU6ICd3ZWInLFxuICAgICAgICBjb250YWluZXJQb3J0OiA4MFxuICAgICAgfSldLFxuICAgICAgLy8gaW5jbHVkZSBoZWFsdGggY2hlY2sgKGRlZmF1bHQgaXMgbm9uZSlcbiAgICAgIGhlYWx0aENoZWNrOiB7XG4gICAgICAgIGludGVydmFsOiBEdXJhdGlvbi5zZWNvbmRzKDYwKSxcbiAgICAgICAgcGF0aDogXCIvaGVhbHRoXCIsXG4gICAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoNSksXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cbn1cblxuIl19
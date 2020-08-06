"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcsServiceHandler = void 0;
const aws_ecs_1 = require("@aws-cdk/aws-ecs");
class EcsServiceHandler {
    constructor(stack) {
        this.stack = stack;
    }
    createTaskDefinition() {
        // Create Task Definition
        const taskDefinition = new aws_ecs_1.Ec2TaskDefinition(this.stack, 'TaskDef');
        const container = taskDefinition.addContainer('web', {
            image: aws_ecs_1.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
            memoryLimitMiB: 256,
        });
        container.addPortMappings({
            containerPort: 80,
            hostPort: 8080,
            protocol: aws_ecs_1.Protocol.TCP
        });
        return taskDefinition;
    }
    createService(cluster, taskDefinition) {
        // Create Service
        const service = new aws_ecs_1.Ec2Service(this.stack, "Service", {
            cluster,
            taskDefinition,
        });
        return service;
    }
}
exports.EcsServiceHandler = EcsServiceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLXNlcnZpY2UtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVjcy1zZXJ2aWNlLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBRzBCO0FBRzFCLE1BQWEsaUJBQWlCO0lBRzVCLFlBQVksS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQix5QkFBeUI7UUFDekIsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ25ELEtBQUssRUFBRSx3QkFBYyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQztZQUM5RCxjQUFjLEVBQUUsR0FBRztTQUNwQixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsZUFBZSxDQUFDO1lBQ3hCLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGtCQUFRLENBQUMsR0FBRztTQUN2QixDQUFDLENBQUM7UUFFSCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWlCLEVBQUUsY0FBOEI7UUFDN0QsaUJBQWlCO1FBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtZQUNwRCxPQUFPO1lBQ1AsY0FBYztTQUNmLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQWpDRCw4Q0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgXG4gIEVjMlRhc2tEZWZpbml0aW9uLCBDb250YWluZXJJbWFnZSwgUHJvdG9jb2wsIFxuICBJQ2x1c3RlciwgRWMyU2VydmljZSwgVGFza0RlZmluaXRpb24gXG59IGZyb20gXCJAYXdzLWNkay9hd3MtZWNzXCI7XG5cblxuZXhwb3J0IGNsYXNzIEVjc1NlcnZpY2VIYW5kbGVyIHtcbiAgcHJpdmF0ZSBzdGFjazogQ29uc3RydWN0O1xuICBcbiAgY29uc3RydWN0b3Ioc3RhY2s6IENvbnN0cnVjdCkge1xuICAgIHRoaXMuc3RhY2sgPSBzdGFjaztcbiAgfVxuICBcbiAgY3JlYXRlVGFza0RlZmluaXRpb24oKSB7XG4gICAgLy8gQ3JlYXRlIFRhc2sgRGVmaW5pdGlvblxuICAgIGNvbnN0IHRhc2tEZWZpbml0aW9uID0gbmV3IEVjMlRhc2tEZWZpbml0aW9uKHRoaXMuc3RhY2ssICdUYXNrRGVmJyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCd3ZWInLCB7XG4gICAgICBpbWFnZTogQ29udGFpbmVySW1hZ2UuZnJvbVJlZ2lzdHJ5KFwiYW1hem9uL2FtYXpvbi1lY3Mtc2FtcGxlXCIpLFxuICAgICAgbWVtb3J5TGltaXRNaUI6IDI1NixcbiAgICB9KTtcbiAgICBcbiAgICBjb250YWluZXIuYWRkUG9ydE1hcHBpbmdzKHtcbiAgICAgIGNvbnRhaW5lclBvcnQ6IDgwLFxuICAgICAgaG9zdFBvcnQ6IDgwODAsXG4gICAgICBwcm90b2NvbDogUHJvdG9jb2wuVENQXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGFza0RlZmluaXRpb247XG4gIH1cblxuICBjcmVhdGVTZXJ2aWNlKGNsdXN0ZXI6IElDbHVzdGVyLCB0YXNrRGVmaW5pdGlvbjogVGFza0RlZmluaXRpb24gKSB7XG4gICAgLy8gQ3JlYXRlIFNlcnZpY2VcbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEVjMlNlcnZpY2UodGhpcy5zdGFjaywgXCJTZXJ2aWNlXCIsIHtcbiAgICAgIGNsdXN0ZXIsXG4gICAgICB0YXNrRGVmaW5pdGlvbixcbiAgICB9KTtcblxuICAgIHJldHVybiBzZXJ2aWNlO1xuICB9XG59Il19
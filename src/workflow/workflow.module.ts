import { Module } from '@nestjs/common';
import { workflowProviders } from './entity/workflow.provider';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService,...workflowProviders],
  exports: [WorkflowService]
})
export class WorkflowModule {}

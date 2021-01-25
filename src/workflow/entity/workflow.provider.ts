import { Workflow } from "./workflow.entity";

export const workflowProviders = [
    {
      provide: 'WORKFLOW_REPOSITORY',
      useValue: Workflow,
    },
  ];
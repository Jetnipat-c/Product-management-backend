import { Work } from "./work.entity";

export const workProviders = [
    {
      provide: 'WORK_REPOSITORY',
      useValue: Work,
    },
];
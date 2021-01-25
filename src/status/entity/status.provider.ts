import { Status } from "./status.entity";

export const statusProviders = [
    {
      provide: 'STATUS_REPOSITORY',
      useValue: Status,
    },
];
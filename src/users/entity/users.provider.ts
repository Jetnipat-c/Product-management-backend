import { Token, Users } from "./users.entity";

export const usersProviders = [
    {
      provide: 'USERS_REPOSITORY',
      useValue: Users,
    },
    {
      provide: 'TOKEN_REPOSITORY',
      useValue: Token,
    },
  ];
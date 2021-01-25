import { Token } from "src/users/entity/users.entity";

export const AuthProviders = [{
    provide: 'TOKEN_REPOSITORY',
    useValue: Token,
  },];
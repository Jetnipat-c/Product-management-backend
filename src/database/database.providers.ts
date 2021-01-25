import { Sequelize } from 'sequelize-typescript';
import { Config } from 'src/config/config';
import { Product } from 'src/product/entity/product.entity';
import { Status } from 'src/status/entity/status.entity';
import { Token, Users } from 'src/users/entity/users.entity';
import { Work } from 'src/work/entity/work.entity';
import { Workflow } from 'src/workflow/entity/workflow.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: Config.database.host,
        port: Config.database.port,
        username: Config.database.username,
        password: Config.database.password,
        database: Config.database.database,
      });
      sequelize.addModels([Product,Work,Status,Users,Token,Workflow]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './entity/users.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService,...usersProviders],
  exports:[UsersService]
})
export class UsersModule {}

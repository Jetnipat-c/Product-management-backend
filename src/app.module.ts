import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { WorkModule } from './work/work.module';
import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [DatabaseModule, ProductModule, WorkModule, StatusModule, UsersModule, AuthModule, WorkflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

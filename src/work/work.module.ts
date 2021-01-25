import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { workProviders } from './entity/work.provider';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkController],
  providers: [WorkService,...workProviders],
  exports: [WorkService]
})
export class WorkModule {}

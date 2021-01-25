import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { statusProviders } from './entity/status.provider';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusController],
  providers: [StatusService,...statusProviders],
  exports: [StatusService]
})
export class StatusModule {}

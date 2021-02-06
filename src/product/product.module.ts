import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { Config } from 'src/config/config';
import { DatabaseModule } from 'src/database/database.module';
import { Work } from 'src/work/entity/work.entity';
import { workProviders } from 'src/work/entity/work.provider';
import { workflowProviders } from 'src/workflow/entity/workflow.provider';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { WorkflowService } from 'src/workflow/workflow.service';
import { productProviders } from './entity/product.provider';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule,
    MulterModule.registerAsync({
    useFactory: () => ({
      dest:  `/images${Config.ImagePath.product}`,
    }),
  })],
  controllers: [ProductController],
  providers: [ProductService,...productProviders,WorkflowService,...workflowProviders,Work,...workProviders],
  exports: [ProductService]
})
export class ProductModule {}
 
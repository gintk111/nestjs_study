import { Global, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Global()
@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

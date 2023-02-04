import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { Timestamp } from './utils/scalart/timestamp.scalar';
import LogsMiddleware from './utils/logs.middleware';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [Timestamp],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}

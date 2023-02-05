import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { Timestamp } from './utils/scalart/timestamp.scalar';
import LogsMiddleware from './utils/logs.middleware';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { AuthenticationModule } from './authentication/authentication.module';
import Product from "./product/product.entity";

@Module({
  imports: [ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'nestjs_study',
      entities: [User, Product],
      synchronize: true,
    }),
    UserModule,
    AuthenticationModule,],
  controllers: [],
  providers: [Timestamp],
})
export class AppModule {}

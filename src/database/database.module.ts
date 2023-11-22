import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { Cart, CartItem, Order, Product, User } from './entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({  
      imports:[ConfigModule.forRoot(
        {
          isGlobal:true,
          envFilePath:".env"
        }
      )],
      useFactory:(configService:ConfigService)=>({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        database: configService.get("DB_NAME"),
        username: configService.get(`DB_USERNAME`),
        password: configService.get(`DB_PASSWORD`),
        entities: [Cart, CartItem, Order, Product, User],
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
     inject:[ConfigService]
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order, Product, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
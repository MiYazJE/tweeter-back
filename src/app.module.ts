import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import { ConfigEnum } from './config/config.enum';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get(ConfigEnum.MONGO_URL) +
          '/' +
          config.get(ConfigEnum.MONGO_DATABASE);
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}

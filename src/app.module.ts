import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GreetingsModule } from 'api/greetings';
import { NotesController, NotesModule } from 'api/notes';
import { UsersController, UsersModule } from 'api/users';
import { AuthController, AuthModule } from 'auth';
import configurations from 'config/configurations';
import { DATABASE_ENVIRONMENT } from 'config/constants';
import { ErrorMiddleware, LoggerMiddleware } from 'middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(DATABASE_ENVIRONMENT),
      }),
      inject: [ConfigService],
    }),
    GreetingsModule,
    NotesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorMiddleware)
      .forRoutes(NotesController, UsersController, AuthController);
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(NotesController, UsersController, AuthController);
  }
}

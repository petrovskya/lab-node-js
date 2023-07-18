import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GreetingsModule } from 'api/greetings';
import { NotesController, NotesModule } from 'api/notes';
import { UsersController, UsersModule } from 'api/users';
import { ENVIRONMENT_PATH } from 'config/constants';
import { ErrorMiddleware, LoggerMiddleware } from 'middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENVIRONMENT_PATH }),
    MongooseModule.forRoot(String(process.env.DATABASE_URL)),
    GreetingsModule,
    NotesModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes(NotesController, UsersController);
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(NotesController, UsersController);
  }
}

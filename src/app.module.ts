import { Module } from '@nestjs/common';

import { GreetingsModule } from 'api/greetings';

@Module({
  imports: [GreetingsModule],
})
export class AppModule {}

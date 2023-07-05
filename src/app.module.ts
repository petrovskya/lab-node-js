import { Module } from '@nestjs/common';

import { GreetingsModule } from 'api/greetings';
import { NotesModule } from 'api/notes';

@Module({
  imports: [GreetingsModule, NotesModule],
})
export class AppModule {}

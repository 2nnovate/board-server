import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [
    PostModule,
    DatabaseModule,
  ],
})
export class AppModule {}

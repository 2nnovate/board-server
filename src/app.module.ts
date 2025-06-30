import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    PostModule,
    CommentsModule,
  ],
})
export class AppModule {}

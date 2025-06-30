import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    DatabaseModule,
    PostModule,
    CommentsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentsProviders } from './comments.providers';
import { PostModule } from '../posts/posts.module';

@Module({
  imports: [PostModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ...commentsProviders,
  ],
})
export class CommentsModule {}

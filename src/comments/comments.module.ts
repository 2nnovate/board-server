import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentsProviders } from './comments.providers';
import { PostModule } from '../posts/posts.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PostModule,
    NotificationsModule,
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ...commentsProviders,
  ],
})
export class CommentsModule {}

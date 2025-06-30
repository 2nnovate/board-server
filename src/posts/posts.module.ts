import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.providers';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...postsProviders,
  ],
  exports: [PostsService],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';
import { notificationsProviders } from '../notifications/notifications.providers';

@Module({
  providers: [
    NotificationsService,
    ...notificationsProviders,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}

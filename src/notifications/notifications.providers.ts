import { KeywordNotification } from './entities/keyword-notification.entity';
import { NotificationLog } from './entities/notification-log.entity';

export const notificationsProviders = [
  {
    provide: 'KEYWORD_NOTIFICATIONS_REPOSITORY',
    useValue: KeywordNotification,
  },
  {
    provide: 'NOTIFICATION_LOGS_REPOSITORY',
    useValue: NotificationLog,
  },
];

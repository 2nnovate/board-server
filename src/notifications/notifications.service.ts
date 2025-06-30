import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KeywordNotification } from './entities/keyword-notification.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { KeywordSubscriptionTrie } from './domain/keyword-subscription.trie';

@Injectable()
export class NotificationsService {
    private keywordTrie = new KeywordSubscriptionTrie();
    constructor(
        @Inject('KEYWORD_NOTIFICATIONS_REPOSITORY')
        private notificationsRepository: typeof KeywordNotification,
        @Inject('NOTIFICATION_LOGS_REPOSITORY')
        private notificationLogsRepository: typeof NotificationLog
    ) {
      this.initKeywordTrie();
    }

    private async getAllKeywordNotifications(): Promise<KeywordNotification[]> {
      return this.notificationsRepository.findAll();
    }

    private async initKeywordTrie() {
      const notifications = await this.getAllKeywordNotifications();
      notifications.forEach(notification => {
        this.keywordTrie.addKeyword(notification.keyword, notification.author);
      });
    }

    @Cron('*/10 * * * *')
    async refreshKeywordTrie() {
      await this.initKeywordTrie();
    }

    public sendNotification(
      text: string,
      triggerType: 'POST' | 'COMMENT',
      triggerId: number,
    ): void {
      const keywordSubscribers = this.keywordTrie.findKeywordSubscribers(text);
      for (const [keyword, subscribers] of keywordSubscribers) {
        subscribers.forEach((subscriber) => {
          this.notificationLogsRepository.create({
            targetAuthor: subscriber,
            keyword,
            triggerType,
            triggerId,
          });

          const notificationMessage = `🔔 [키워드 알림] "${keyword}" ${triggerType === 'POST' ? '게시글' : '댓글'}이 발견되었습니다.`;
          console.log(`to: ${subscriber}, message: ${notificationMessage}`);
        });
      }
    }
}

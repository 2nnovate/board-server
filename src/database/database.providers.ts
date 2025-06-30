import { Sequelize } from 'sequelize-typescript';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { KeywordNotification } from '../notifications/entities/keyword-notification.entity';
import { NotificationLog } from '../notifications/entities/notification-log.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([
        Post,
        Comment,
        KeywordNotification,
        NotificationLog,
      ]);
      return sequelize;
    },
  },
];

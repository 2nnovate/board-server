import { Comment } from './entities/comment.entity';

export const commentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useValue: Comment,
  },
];

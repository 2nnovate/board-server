
import { Post } from './entities/post.entity';

export const postsProviders = [
  {
    provide: 'POSTS_REPOSITORY',
    useValue: Post,
  },
];

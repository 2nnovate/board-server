import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from '../../posts/posts.service';

@Injectable()
export class PostExistGuard implements CanActivate {
  constructor(
    private readonly postsService: PostsService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { postId } = request.body;
    if (!postId) {
      throw new BadRequestException('post id is required');
    }

    const post = await this.postsService.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return true;
  }
}

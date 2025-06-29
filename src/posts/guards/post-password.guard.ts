import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PostsService } from '../posts.service';

@Injectable()
export class PostPasswordGuard implements CanActivate {
  constructor(
    private readonly postsService: PostsService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { password } = request.body;
    if (!password) {
      throw new UnauthorizedException('Password is required');
    }

    const postId = parseInt(request.params.id, 10);
    const post = await this.postsService.findById(postId);
    if (!post) {
      throw new UnauthorizedException('Post not found');
    }

    const isValid = await bcrypt.compare(password, post.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return true;
  }
}
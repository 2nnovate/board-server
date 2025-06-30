import { Injectable, Inject } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: typeof Comment
  ) {}

  async list(
    current: number = 1,
    pageSize: number = 20,
  ): Promise<{ data: Comment[], total: number }> {
    const { count, rows: result } = await this.commentsRepository.findAndCountAll<Comment>({
      limit: pageSize,
      offset: (current - 1) * pageSize,
    });

    return {
      data: result,
      total: count,
    };
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsRepository.create<Comment>({
      postId: createCommentDto.postId,
      parentId: createCommentDto.parentId,
      content: createCommentDto.content,
      author: createCommentDto.author,
    });
  }
}

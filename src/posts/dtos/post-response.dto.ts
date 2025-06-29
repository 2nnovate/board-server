import { Post } from '../entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { CommentResponseDto } from '../../comments/dtos/comment-response.dto';

export class PostResponseDto {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    comments: CommentResponseDto[];

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.author = post.author;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.deletedAt = post.deletedAt;

        this.comments = this.buildCommentTree(post.comments || []);
    }

    private buildCommentTree(comments: Comment[], parentId: number | null = null): CommentResponseDto[] {
      return comments
          .filter(comment => comment.parentId === parentId)
          .map(comment => {
              const commentDto = new CommentResponseDto(comment);
              commentDto.replies = this.buildCommentTree(comments, comment.id);
              return commentDto;
          });
  }
}

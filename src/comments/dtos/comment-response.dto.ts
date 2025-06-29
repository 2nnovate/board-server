import { Comment } from '../entities/comment.entity';

export class CommentResponseDto {
    id: number;
    postId: number;
    parentId: number;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    constructor(comment: Comment) {
        this.id = comment.id;
        this.postId = comment.postId;
        this.parentId = comment.parentId;
        this.content = comment.displayContent;
        this.author = comment.author;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
        this.deletedAt = comment.deletedAt;
    }
}

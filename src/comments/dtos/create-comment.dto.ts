export class CreateCommentDto {
  postId: number;
  parentId?: number;
  content: string;
  author: string;
}

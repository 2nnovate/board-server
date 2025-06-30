import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dtos/comment-response.dto';

@Controller('comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}

  @Get('list')
  async findAll(
    @Query('current', new DefaultValuePipe(1), ParseIntPipe) current?: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize?: number,
  ): Promise<{ data: CommentResponseDto[], total: number }> {
    const { data, total } = await this.commentsService.list(
      current,
      pageSize,
    );

    return {
      data: data.map(comment => new CommentResponseDto(comment)),
      total,
    };
  }
}
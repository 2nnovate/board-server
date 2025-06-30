import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Post,
  UseGuards,
  Body,
  DefaultValuePipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentResponseDto } from './dtos/comment-response.dto';
import { PostExistGuard } from './guards/post-exist.guard';

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

  @UseGuards(PostExistGuard)
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const result = await this.commentsService.create(createCommentDto);
    return new CommentResponseDto(result);
  }
}

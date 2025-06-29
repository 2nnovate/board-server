import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { SearchPostDto } from './dtos/search-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  findAll(
    @Query('current', ParseIntPipe) current?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
    @Query() searchPostDto?: SearchPostDto,
  ): Promise<{ data: PostResponseDto[], total: number }> {
    return this.postsService.list(
      current,
      pageSize,
      searchPostDto?.searchKey,
      searchPostDto?.searchValue,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponseDto> {
    return this.postsService.findById(id);
  }

  @Post()
  create( 
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto);
  }
}

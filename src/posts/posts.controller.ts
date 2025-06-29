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
  async findAll(
    @Query('current', ParseIntPipe) current?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
    @Query() searchPostDto?: SearchPostDto,
  ): Promise<{ data: PostResponseDto[], total: number }> {
    const { data, total } = await this.postsService.list(
      current,
      pageSize,
      searchPostDto?.searchKey,
      searchPostDto?.searchValue,
    );

    return {
      data: data.map(post => new PostResponseDto(post)),
      total,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponseDto> {
    const result = await this.postsService.findById(id);
    return new PostResponseDto(result);
  }

  @Post()
  async create( 
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const result = await this.postsService.create(createPostDto);
    return new PostResponseDto(result);
  }
}

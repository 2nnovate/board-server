import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
  Delete,
  DefaultValuePipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { SearchPostDto } from './dtos/search-posts.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostPasswordGuard } from './guards/post-password.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  async findAll(
    @Query('current', new DefaultValuePipe(1), ParseIntPipe) current?: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize?: number,
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

  @UseGuards(PostPasswordGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    await this.postsService.update(id, updatePostDto);
    const updated = await this.postsService.findById(id);
    return new PostResponseDto(updated);
  }

  @UseGuards(PostPasswordGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean }> {
    const deleted = await this.postsService.delete(id);
    return { deleted };
  }
}

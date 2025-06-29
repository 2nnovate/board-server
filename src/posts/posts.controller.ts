import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

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

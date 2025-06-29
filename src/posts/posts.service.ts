import { Injectable, Inject } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: typeof Post
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = await this.postsRepository.create<Post>({
      title: createPostDto.title,
      content: createPostDto.content,
      author: createPostDto.author,
      password: createPostDto.password,
    });

    return new PostResponseDto(post);
  }
}

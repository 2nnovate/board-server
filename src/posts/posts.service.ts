import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Post } from './entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: typeof Post
  ) {}

  async list(
    current: number = 1,
    pageSize: number = 20,
    searchKey?: string,
    searchValue?: string,
  ): Promise<{ data: PostResponseDto[], total: number }> {
    const shouldSearch = searchKey && searchValue;
    const { count, rows: result } = await this.postsRepository.findAndCountAll<Post>({
      where: {
        ...(shouldSearch
          ? {
            [searchKey]: { [Op.like]: `%${searchValue}%` },
          }
          : {}),
      },
      limit: pageSize,
      offset: (current - 1) * pageSize,
      distinct: true,
      col: 'id',
      include: [{
        model: Comment,
        paranoid: false,
        order: [['createdAt', 'DESC']],
      }],
    });

    return {
      data: result.map(post => new PostResponseDto(post)),
      total: count,
    };
  }

  async findById(id: number): Promise<PostResponseDto> {
    const post = await this.postsRepository.findOne<Post>({
      where: {
        id,
      },
      include: [{
        model: Comment,
        paranoid: false,
        order: [['createdAt', 'DESC']],
      }],
    });

    return new PostResponseDto(post);
  }

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

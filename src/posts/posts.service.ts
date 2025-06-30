import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Post } from './entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostResponseDto } from './dtos/post-response.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

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
  ): Promise<{ data: Post[], total: number }> {
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
      data: result,
      total: count,
    };
  }

  async findById(id: number): Promise<Post> {
    return this.postsRepository.findOne<Post>({
      where: {
        id,
      },
      include: [{
        model: Comment,
        paranoid: false,
        order: [['createdAt', 'DESC']],
      }],
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.create<Post>({
      title: createPostDto.title,
      content: createPostDto.content,
      author: createPostDto.author,
      password: createPostDto.password,
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<boolean> {
    const [updatedRows] = await this.postsRepository.update({
      title: updatePostDto.title,
      content: updatePostDto.content,
    }, {
      where: {
        id,
      },
    });

    return !!updatedRows;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await this.postsRepository.destroy({
      where: {
        id,
      },
    });

    return !!deletedRows;
  }
}

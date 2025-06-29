import { IsIn, IsOptional, IsString } from 'class-validator';

export class SearchPostDto {
  @IsOptional()
  @IsIn(['title', 'author'], { message: 'searchKey must be either "title" or "author"' })
  searchKey?: 'title' | 'author';

  @IsOptional()
  @IsString()
  searchValue?: string;
}

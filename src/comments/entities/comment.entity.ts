import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { Post } from '../../posts/entities/post.entity';

@Table({
  tableName: 'comments',
  paranoid: true,
  timestamps: true,
})
export class Comment extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'post_id',
  })
  postId: number;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'parent_id',
  })
  parentId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  author: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'deleted_at',
  })
  deletedAt: Date;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return this.getDataValue('deletedAt') ? '삭제된 댓글입니다.' : this.getDataValue('content');
    }
  })
  displayContent: string;

  // Associations
  @BelongsTo(() => Post, {
    foreignKey: 'postId',
  })
  post?: Post;

  @BelongsTo(() => Comment, {
    foreignKey: 'parentId',
  })
  parent?: Comment;

  @HasMany(() => Comment, {
    foreignKey: 'parentId',
  })
  replies?: Comment[];
}

import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Comment } from '../../comments/entities/comment.entity';

@Table({
  tableName: 'posts',
  paranoid: true,
  timestamps: true,
})
export class Post extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

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

  // Associations
  @HasMany(() => Comment, {
    foreignKey: 'postId',
  })
  comments?: Comment[];
}

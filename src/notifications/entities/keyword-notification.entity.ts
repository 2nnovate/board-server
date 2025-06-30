import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'keyword_notifications',
  timestamps: true,
  updatedAt: false,
})
export class KeywordNotification extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  keyword: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;
}
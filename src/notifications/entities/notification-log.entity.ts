import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'notification_logs',
  timestamps: true,
  updatedAt: false,
})
export class NotificationLog extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'target_author',
  })
  targetAuthor: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  keyword: string;

  @Column({
    type: DataType.ENUM('POST', 'COMMENT'),
    allowNull: false,
    field: 'trigger_type',
  })
  triggerType: 'POST' | 'COMMENT';

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'trigger_id',
  })
  triggerId: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;
}

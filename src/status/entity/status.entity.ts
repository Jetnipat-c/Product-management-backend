import { Table, Column, Model,BelongsTo, PrimaryKey,AutoIncrement,HasMany,ForeignKey ,HasOne,AllowNull } from 'sequelize-typescript';

@Table({
    timestamps: true,
    paranoid: true,
})
export class Status extends Model<Status> {
  
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  status_id: number;
  
  @AllowNull(false)
  @Column
  status_name: string;

  @AllowNull(false)
  @Column
  status_description: string;

  // @AllowNull(false)
  // @Column
  // status_status: string;

}


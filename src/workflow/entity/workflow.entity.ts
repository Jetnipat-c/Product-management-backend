import { Table, Column, Model,BelongsTo, PrimaryKey,AutoIncrement,HasMany,ForeignKey ,HasOne,AllowNull } from 'sequelize-typescript';
import { Product } from 'src/product/entity/product.entity';
import { Work } from 'src/work/entity/work.entity';

@Table({
    timestamps: true,
    paranoid: true,
})
export class Workflow extends Model<Workflow> {
  
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  workflow_id: number;
  
  @AllowNull(false)
  @Column
  workflow_start: string;

  @ForeignKey(() => Work)
  work_id: Work

  @BelongsTo(() => Work)
  work: Work

  @ForeignKey(() => Product)
  product_id: Product

  @BelongsTo(() => Product)
  product: Product
}


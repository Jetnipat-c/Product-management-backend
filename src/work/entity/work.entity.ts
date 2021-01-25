import { Table, Column, Model,BelongsTo, PrimaryKey,AutoIncrement,HasMany,ForeignKey ,HasOne,AllowNull } from 'sequelize-typescript';
import { Product } from 'src/product/entity/product.entity';

@Table({
    timestamps: true,
    paranoid: true,
})
export class Work extends Model<Work> {
  
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  work_id: number;
  
  @AllowNull(false)
  @Column
  work_name: string;

  // @AllowNull(false)
  // @Column
  // work_start: string;

  // @AllowNull(false)
  // @Column
  // work_finish: string;

  // @ForeignKey(() => Product)
  // product_id: Product;

  // @BelongsTo(() => Product)
  // product: Product;

  // @HasOne(() => Product)
  // product: Product[]

  
}


import { Table, Column, Model,BelongsTo, PrimaryKey,AutoIncrement,HasMany,ForeignKey ,HasOne,AllowNull } from 'sequelize-typescript';
import { Work } from 'src/work/entity/work.entity';
import { Workflow } from 'src/workflow/entity/workflow.entity';

@Table({
    timestamps: true,
    paranoid: true,
})
export class Product extends Model<Product> {
  
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  product_id: number;
  
  @AllowNull(false)
  @Column
  company: string;

  @AllowNull(false)
  @Column
  receipt_code: string;

  @AllowNull(false)
  @Column
  product_width: string;

  @AllowNull(false)
  @Column
  product_size: string;

  @AllowNull(false)
  @Column
  product_color: string;

  @AllowNull(false)
  @Column
  price: string;

  @AllowNull(false)
  @Column
  note: string;

  @AllowNull(true)
  @Column
  photo: string

  

  // @AllowNull(false)
  // @Column
  // product_amount: number;

  // @HasOne(() => Work)
  // work: Work[]

  // @ForeignKey(() => Work)
  // work_id: Work

  // @BelongsTo(() => Work)
  // work: Work

  // @ForeignKey(() => Workflow)
  // workflow_id: Workflow

  // @BelongsTo(() => Workflow)
  // workflow: Workflow
}


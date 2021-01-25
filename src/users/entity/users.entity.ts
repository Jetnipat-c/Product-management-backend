import { Table, Column, Model, PrimaryKey,AutoIncrement ,AllowNull, DataType, ForeignKey, HasMany, Unique } from 'sequelize-typescript';


@Table({
    timestamps: true,
    paranoid: true,
})
export class Users extends Model<Users> {
  
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  userId: number;
  
  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string

  @AllowNull(true)
  @Column
  fname: string;

  @AllowNull(true)
  @Column
  lname: string;

  @AllowNull(true)
  @Column
  phoneNumber: string;

  @AllowNull(true)
  @Column
  role: number;

  @AllowNull(true)
  @Column
  photo: string;

  @HasMany(() => Token)
  accessTokens: Token[];
}

@Table({
  timestamps: false,
  paranoid: false,
})
export class Token extends Model<Token> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  token_id: number;

  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column
  userId: number;
}
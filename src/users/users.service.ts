import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserstDto } from './dto/users.dto';
import { Token, Users } from './entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { access } from 'fs';
@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private users: typeof Users,
    @Inject('TOKEN_REPOSITORY') private token: typeof Token) {}
    // ###################################################################### CreateUser ######################################################################
    async create_user(signUpInfo: AuthDto) {
    console.log("Step 2 : check length username, password and check username, email in database")
    if (signUpInfo.username.length < 4) {
      return { message: 'username must be longer than 4' };
    }
    if (signUpInfo.password.length < 6) {
      return { message: 'password must be longer than 6' };
    }
    if (await this.find_user_one({ type: 'username', data: signUpInfo.username })) {
      return { message: 'already have this username' };
    }
    if (await this.find_user_one({ type: 'email', data: signUpInfo.email })) {
       return { message: 'already have this email' };
    }
    //ก่อนบันทึก password นำ password ไม่เข้ารหัสก่อนเก็บในฐานข้อมูล
    signUpInfo.password = await this.generator_hash(signUpInfo.password);
    await this.users.create(signUpInfo);
    console.log(">>> Create user succeed <<<")
    return { message: 'create user succeed' };
    }

    // ###################################################################### Find_user_one ######################################################################
    async find_user_one(options: any) {
     return await this.users.scope({}).findOne({
      where: { [`${options.type}`]: options.data },
      raw: true,
    });
    }
    // ###################################################################### Generator_hash ######################################################################
    generator_hash(password: string) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  // ###################################################################### Add token ######################################################################
  async add_token(user: any, access_token: string){
    console.log("Step 9 Start add_token find username in database")
    user = await this.find_user_one({
      type: 'username',
      data: user.username
    })
    //console.log("find user : ",typeof(user))
    console.log("Step 10 case: have user next combine same payload ")
    if (!user) { return {error: 'user not found'}}
    
    const combine = {
      userId: user.userId,
      token: access_token
    
    }
    console.log("Step 11 create token for userId ")
    let result = await this.token.create(combine)
    return result
  }
  // ###################################################################### Remove token ######################################################################
  async remove_token(access_token: string){
    const token_user = await this.token.destroy({
      where: {token: access_token}
    })
    if (!token_user) {
      throw new UnauthorizedException();
    }
    return { message: 'Signout succeed'}
}
  // ###################################################################### Check token ######################################################################
  async check_token(access_token){
    let token_user = await this.token.findOne({
      where: {token: access_token}
    })
    return !token_user ? false : true
  }
}

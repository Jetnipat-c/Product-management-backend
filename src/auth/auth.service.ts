import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserstDto } from 'src/users/dto/users.dto';
import { MESSAGE } from 'src/config/message/global.configure';
import { Token, Users } from 'src/users/entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { AuthDto, AuthSigninDto } from './dto/auth.dto';
import { any } from 'sequelize/types/lib/operators';
import { MailerService } from 'src/utils/mailer.service';
enum SIGNIN_TYPE {
  EMAIL,
  USERNAME,

}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    //@Inject('USERS_REPOSITORY') private users: typeof Users,
    @Inject('TOKEN_REPOSITORY') private token: typeof Token
  ) {}
  // ###################################################################### SignUp ######################################################################
  async signup(signUpInfo: AuthDto){
    // ส่งข้อมูลไปสร้าง user
    console.log("Step 1 : Sent userInfo to create_user")
    const result = await this.usersService.create_user(signUpInfo)
    //console.log('result create user',result)
    console.log("Step 4 : Check Succeed or Error result from create_user")
    // ถ้าสร้าง user สำเร็จ
    if (result.message == 'create user succeed') {
      console.log("Final",{ message: result.message })
      return result
    }
    // ถ้าสร้างไม่สำเร็จ
    else{
      console.log("Final",{ message: result.message })
      return { message: result.message }
    }
  }
  // ###################################################################### SignUp AND Upload img ######################################################################
  async signupwithimg(signUpInfo: AuthDto,filename: string){
    // ส่งข้อมูลไปสร้าง user
    console.log("filename : ",filename)
    console.log("Step 1 : Sent userInfo to create_user")
    signUpInfo.photo = `images/user/${filename}`
    const result = await this.usersService.create_user(signUpInfo)
    //console.log('result create user',result)
    console.log("Step 4 : Check Succeed or Error result from create_user")
    // ถ้าสร้าง user สำเร็จ
    if (result.message == 'create user succeed') {
      console.log("Final",{ message: result.message })
      return result
    }
    // ถ้าสร้างไม่สำเร็จ
    else{
      console.log("Final",{ message: result.message })
      return { message: result.message }
    }
  }
  // ###################################################################### SignIn ######################################################################
  async signin(signInfo: string, password: string){
    // authSignDto.sigInfo == username
    // ส่ง username ที่ผู้ใช้ส่งเข้ามาไปเช็ค type 
    console.log("Step 1 checkSigninType")
    let signinType = this.checkSigninType(signInfo)
    //console.log("signinType : ",signinType)
    // ทำ signInfo ให้เป็นตัวพิมใหญ้ทั้งหมด
    console.log("Step 3 username covert UpperCase")
    signInfo = signInfo.toUpperCase()
    //console.log("signInfo : ",signInfo)
    console.log("Step 4 switch way signin email or username")
    switch(signinType) {
      case SIGNIN_TYPE.EMAIL:
        return this.signWithEmail(signInfo,password);
      case SIGNIN_TYPE.USERNAME:
        return this.signWithUsername(signInfo,password);
    }
  }
  // ###################################################################### CheckSigninType ######################################################################
  private checkSigninType(userInfo: string){
    console.log("Step 2 split username and define type")
    // เอา username มา split แยกตัวอักษร
    let userInfoArray = userInfo.split('');
    //console.log(userInfoArray)
    // หา @ ใน Array เพื่อกำหนดให้เป็น Type Email
    let typeuserInfo = userInfoArray.find(item => {
      return item == '@'
    })
    //console.log("typeuserInfo : ",typeuserInfo)
    return typeuserInfo != undefined ? SIGNIN_TYPE.EMAIL : SIGNIN_TYPE.USERNAME
  }
  // ###################################################################### Signin With Email ######################################################################
  async signWithEmail(email: string, password: string){
    console.log("Step 5 - 1 : signWithEmail find email in database")
    const user = await this.usersService.find_user_one({
      type: 'email',
      data: email,
    })
    //console.log("user signwithemail = ",user)
    console.log("Step 5 - 2 : if have user , user and pass word compareSync")
    if (user) {
    if(user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      console.log("Step 5 - 3 call createToken")
      await this.createToken(result)
      return { message: 'SignInWith Email succeed'}
    }
    else {
      throw new UnauthorizedException()
    }
  }
  else {
    throw new UnauthorizedException()
  }
  }
  // ###################################################################### Signin With Username ######################################################################
  async signWithUsername(username: string, password: string){
    console.log("Step 5 - 1 : signWithEmail find email in database")
    const user = await this.usersService.find_user_one({
      type: 'username',
      data: username,
    })
    //console.log("user signwithemail = ",user)
    console.log("Step 5 - 2 : if have user , user and pass word compareSync")
    if (user) {
    if(user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      console.log("Step 5 - 3 call createToken")
      //await this.createToken(result)
      return await this.createToken(result)
      //return { message: 'SignInWith Username succeed'}
    }
    else {
      throw new UnauthorizedException()
    }
  }
  else {
    throw new UnauthorizedException()
  }
  }
  // ###################################################################### Create Token ######################################################################
  private async createToken (user: any){
    console.log("Step 6 create payload")
    //console.log("createToken user : ",user)
    const payload = {
      username: user.username,
      sub: user.userId,
      email: user.email,
      address: user.address,
      phone: user.phoneNumber,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
    };
    console.log("Step 7 call jwtService.sign for access_token")
    const token = await this.jwtService.sign(payload);
    console.log("Step 8 send payload, token to create token")
    await this.usersService.add_token(payload,token)
    return {
      access_token: token,
      payload,
    };
  }
  // ###################################################################### Signout ######################################################################
  async signout(token: string){
    return await this.usersService.remove_token(token)
  }

  // ###################################################################### RefreshToken ######################################################################
  async refreshToken(access_token: string){
    let user_from_token:any = await this.validateToken(access_token);
    console.log('user form : ',user_from_token)
    let user = await this.usersService.find_user_one({
      type: 'username',
      data: user_from_token.username
    })
    console.log("user =",user)
    let remove = await this.usersService.remove_token(access_token)
    console.log("remove = ",remove)
    const payload = {
      username: user.username,
      sub: user.userId,
      email: user.email,
      address: user.address,
      phone: user.phoneNumber,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
    };
    const token = await this.jwtService.sign(payload)
    await this.usersService.add_token(user,token)
    return {
      access_token: token,
      payload,
    };
  }

  // ###################################################################### ValidateToken ######################################################################
  async validateToken(accessToken: string) {
    return await this.jwtService.decode(accessToken)
  }

  // ###################################################################### SigninWithToken ######################################################################
  async signwithtoken(token: string){
    let status_token = await this.usersService.check_token(token)
    console.log("status : ",status_token)
    if (!status_token) {
      throw new UnauthorizedException();
    }
    let user_from_token: any = await this.validateToken(token);
    console.log("user from :",user_from_token)
    let user = await this.usersService.find_user_one({
      type: 'username',
      data: user_from_token.username
    })
    console.log("user : ",user)
    const payload = {
      username: user.username,
      sub: user.userId,
      email: user.email,
      address: user.address,
      phone: user.phoneNumber,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
    };
    return payload
  }

  async forgot(signInfo: string){
    let user = await this.check_type_forget(signInfo)

    let out = `<html >
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body style="margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
            <tr>
                <td style="padding: 10px 0 30px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                        <tr>
                            <td align="left"  bgcolor="#ffffff"  style="padding: 5px;">
                                
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding-top: 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #153643; text-align:left;">
                                            <p>สวัสดีค่ะ</p>
                                            <p>กรุณานำรหัสรีเซ็ต ยืนยันในหน้าเว็บไซต์เพื่อตั้งรหัสผ่านใหม่ด้วยค่ะ และรหัสจะสามารถใช้ได้ถึง ....</p>
                                            <b>รหัสรีเซ็ต : ..... </b>
                                            <p>ขอบคุณที่ให้ความร่วมมือด้วยดีเสมอมา</p>
                                        </td>
                                    </tr>
                               </table>
                               </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    console.log("user : ",typeof(user))
    let users = await JSON.parse(JSON.stringify(user, null, 4));
    console.log("users : ",typeof(users))
    try {
      await this.mailerService.sendmail(users.email,out,'การรีเซ็ตรหัสผ่าน',)
      return { sent: {email: users.email, username: users.username}}
    }
    catch (error) {
      return { message: 'send mail error' }
    }
  }

  async check_type_forget(signInfo: string){
    const user_type = this.checkSigninType(signInfo)
    signInfo = signInfo.toUpperCase();
    switch (user_type) {
      case SIGNIN_TYPE.EMAIL:
        return await this.usersService.find_user_one({
          type: 'email',
          data: signInfo,
        });
      case SIGNIN_TYPE.USERNAME:
        return await this.usersService.find_user_one({
          type: 'username',
          data: signInfo,
        });
    }
  }
}
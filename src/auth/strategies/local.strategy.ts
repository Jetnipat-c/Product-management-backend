import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserstDto } from 'src/users/dto/users.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // async validate(username: string, password: string): Promise<any> {
  //   console.log("Step 1 call func validateUser :",username,password)
  //   // ส่ง user pass ไปเช็ค
  //   const user = await this.authService.validateUser(username,password);
  //   //console.log("Return user",user)
  //   // เช็คผลจาก validateUser ว่า return ออกมาเป็นข้อมูล หรือ ข้อผิดพลาด
  //   if (user.code == 10) {
  //     // ถ้าผิดพลาด
  //     throw new UnauthorizedException();
  //   }
  //   // ถ้าเช็ค ทุกอย่างถูกต้องหมดแล้ว
  //   return user;
  // }
}
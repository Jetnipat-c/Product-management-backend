import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("payload :",payload)
    return {  
      username: payload.username,
      sub: payload.userId,
      email: payload.email,
      address: payload.address,
      phone: payload.phoneNumber,
      fname: payload.fname,
      lname: payload.lname,
      role: payload.role,
    };
  }
}
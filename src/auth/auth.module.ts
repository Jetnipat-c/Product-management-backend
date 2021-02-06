import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from 'src/users/entity/users.provider';
import { UsersModule } from 'src/users/users.module';
import { MailerService } from 'src/utils/mailer.service';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.provider';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[
    forwardRef(() => UsersModule),
     PassportModule,
     JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,...AuthProviders,MailerService],
  exports: [AuthService]
})
export class AuthModule {}

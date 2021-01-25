import { Body, Controller, Post, UseGuards, Request, Get, Res, HttpStatus, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/pathfile/multer.user.config';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto, AuthSigninDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/local-auth.guard';
import { LocalAuthGuard } from './guards/wt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService) {}

    @Post('signin')
    // signin >> checkSigninType >> toUpperCase >> switch(signinType) >> signWith... 
    // >> find_user_one >> user && bcrypt.compareSync(pass) >> createToken >> jwtService.sign
    // >> add_token
    async sigin(@Body('signInfo') signInfo,
    @Body('password') password, @Res() res){
        let result = await this.authService.signin(signInfo,password)
      return res.status(HttpStatus.OK).json(result)
    }

    @Post('signup')
    // signup >> create_user >> generator_hash >> create
    async signup(@Body() authDto: AuthDto, @Res() res,){
      let result = await this.authService.signup(authDto)
      return res.status(HttpStatus.OK).json(result);
    }

    @Post('signupwithimg')
    @UseInterceptors(FilesInterceptor('img', 1, multerConfig))
    // signup >> create_user >> generator_hash >> create
    async signupwithimg(@Body() authDto: AuthDto, @Res() res, @UploadedFiles() file){
      let status = HttpStatus.OK;
      let result = await this.authService.signupwithimg(authDto,file[0].filename)
      //console.log("filename : ",file[0].filename)
      let response = {
        photo: `xx`
      }
      return res.status(HttpStatus.OK).json(result);
    }

    @Post('signout')
    // signout >> remove_token >> destroy
    async signout(@Req() req, @Res() res){
      let result = await this.authService.signout(req.headers.authorization.split(' ')[1])
      return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('jwt'))
    // jwt.strategy.ts
    @Post('refreshToken')
    // refreshToken >> validateToken >> find_user_one >> remove_token >> jwtService.sign
    // >> add_token
    async refreshToken(@Req() req, @Res() res){
      let result = await this.authService.refreshToken(req.headers.authorization.split(' ')[1])
      return res.status(HttpStatus.OK).json(result)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Post('sign_token')
    // signwithtoken >> check_token >> validateToken >> find_user_one 
    async signinWithToken(@Req() req, @Res() res){
      let result = await this.authService.signwithtoken(req.headers.authorization.split(' ')[1])
      return res.status(HttpStatus.OK).json(result)
    }

    @Post('forgot')
    async forgot(@Body('signInfo') signInfo, @Res() res){
      let result = await this.authService.forgot(signInfo)
      return res.status(HttpStatus.OK).json(result);
    }
}

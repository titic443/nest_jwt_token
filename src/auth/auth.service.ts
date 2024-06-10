import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

  ) { }
  async signIn(username: string, pass: string): Promise<any> {
    // console.log('=====');
    // console.log(this.configService.get('JWT_SECRET'));
    // console.log('=====');
    const user = await this.usersService.findOne(username);
    // console.log(user.password);
    if (user?.password !== pass) {
      this.logger.error(new UnauthorizedException())
      throw new UnauthorizedException();
    }
    // const payload = { sub: user.userId, username: user.username };
    const payload = { myid: user.password };

    this.logger.log('Provide token: ' + this.jwtService.sign(payload));
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}

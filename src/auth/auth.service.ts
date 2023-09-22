import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    // console.log('=====');
    // console.log(this.configService.get('JWT_SECRET'));
    // console.log('=====');
    const user = await this.usersService.findOne(username);
    // console.log(user.password);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const payload = { sub: user.userId, username: user.username };
    const payload = { myid: user.password };
    console.log(payload);
    console.log('Provide token: ', this.jwtService.sign(payload));
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(signUpDto: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = new User();
    user.initialize({ ...signUpDto, password: hashedPassword });
    return await this.userService.create(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    const resetLink = `http://localhost:3001/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset',
      template: './forgot-password', // Nome do template de email
      context: {
        name: user.name,
        resetLink,
      },
    });

    return { message: 'Password reset email sent' };
  }

  async resetPassword(resetPasswordDto: { token: string; password: string }) {
    const payload = this.jwtService.verify(resetPasswordDto.token);
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    user.password = hashedPassword;
    await this.userService.updatePassword(user.email, user.password);

    return { message: 'Password reset successfully' };
  }

  async renewToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: 'refresh-secret' });
      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '1h' });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

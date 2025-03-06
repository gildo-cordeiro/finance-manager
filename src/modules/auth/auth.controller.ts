import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(user);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: { name: string; email: string; password: string }) {
    return this.authService.register(signUpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: { token: string; password: string }) {
    return this.authService.resetPassword(resetPasswordDto);

  }

  @Post('renew-token')
  async renewToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.renewToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

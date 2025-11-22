import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body('email') email: string) {
        await this.authService.sendOtp(email);
        return { message: 'OTP sent successfully' };
    }

    @Post('verify')
    async verify(@Body('email') email: string, @Body('code') code: string) {
        return this.authService.verifyOtp(email, code);
    }
}

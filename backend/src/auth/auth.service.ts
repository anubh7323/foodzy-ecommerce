import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Otp } from './entities/otp.entity';
import { UsersService } from '../users/users.service';

import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Otp)
        private otpRepository: Repository<Otp>,
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async sendOtp(email: string): Promise<void> {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        const otp = this.otpRepository.create({
            email,
            code,
            expiresAt,
        });
        await this.otpRepository.save(otp);

        await this.mailService.sendMail(
            email,
            'Your Login OTP',
            `Your OTP is: ${code}`,
            `<p>Your OTP is: <b>${code}</b></p>`
        );
        console.log(`OTP for ${email}: ${code}`);
    }

    async verifyOtp(email: string, code: string): Promise<{ accessToken: string }> {
        const otp = await this.otpRepository.findOne({
            where: { email, code, used: false },
            order: { createdAt: 'DESC' },
        });

        if (!otp || otp.expiresAt < new Date()) {
            throw new BadRequestException('Invalid or expired OTP');
        }

        otp.used = true;
        await this.otpRepository.save(otp);

        let user = await this.usersService.findByEmail(email);
        if (!user) {
            user = await this.usersService.create(email);
        }

        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

// auth.service.ts (rozšířeno)
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(dto: RegisterDto, token: string) {
        try {
            const payload = this.jwtService.verify(token);
            if (!payload || !payload.email || !payload.role) {
                throw new BadRequestException('Invalid invitation token');
            }

            const hashedPassword = await bcrypt.hash(dto.password, 10);

            return this.prisma.user.create({
                data: {
                    email: payload.email,
                    password: hashedPassword,
                    name: dto.name,
                    role: payload.role,
                    restaurantId: 'default-restaurant-id',
                },
            });
        } catch (err) {
            throw new BadRequestException('Invalid or expired token');
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async inviteUser(dto: InviteUserDto) {
        const payload = { email: dto.email, role: dto.role };
        const token = this.jwtService.sign(payload, { expiresIn: '2d' });

        // zde místo toho můžeš implementovat odeslání e-mailu
        return {
            invitationLink: `https://tvoje-apka.cz/registrace?token=${token}`,
        };
    }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async register(dto: RegisterDto) {
        return this.userService.create(dto)
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        })
        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const auth = this.jwtService.sign({ id: user.id, roles: user.roles })
        return { auth }
    }

}
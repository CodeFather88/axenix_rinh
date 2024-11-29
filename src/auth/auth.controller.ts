import { Controller, Post, Body, Get, Res, HttpStatus, UnauthorizedException, Header, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@shared/decorators';
import { LoginDto, RegisterDto } from './dto';
import { Role } from '@shared/enums';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const REFRESH_TOKEN = 'refreshtoken'
@ApiTags('Authorization')
@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

    @ApiOperation({ summary: 'login' })
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @ApiOperation({ summary: 'register' })
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }
}
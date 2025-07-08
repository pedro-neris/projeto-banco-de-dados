import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InfoLogin } from './dto/infoLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    async login(infoLogin: InfoLogin): Promise<{ token: string }> {
        const user = await this.userService.findUserByEmail(infoLogin.email);
        if (!user || user.senha !== infoLogin.senha) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        else {
            const payload = {
                sub: user.id,
            };
            const jwtSecret = process.env.JWT_SECRET;
            const jwtToken = this.jwtService.sign(payload, {
                expiresIn: '24h',
                secret: jwtSecret
            });

            return { token: jwtToken };
        }
    }
}

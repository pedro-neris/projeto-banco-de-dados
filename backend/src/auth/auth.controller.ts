import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/infoLogin.dto';

@ApiTags('Autenticação')
@Controller('auth')
/**
 * ⚠️ AVISO: Sistema de autenticação para fins educacionais.
 * Implementação de JWT para demonstração acadêmica.
 */
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Realizar login' })
    @ApiResponse({ 
        status: 200, 
        description: 'Login realizado com sucesso. Retorna token JWT.',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    description: 'Token JWT para autenticação',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                user: {
                    type: 'object',
                    description: 'Dados do usuário logado',
                }
            }
        }
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Credenciais inválidas',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Credenciais inválidas' },
            }
        }
    })
    @Post('login')
    async login(@Body() InfoLogin: InfoLogin) {
        try {
            return await this.authService.login(InfoLogin);
        } catch (error) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    }
}

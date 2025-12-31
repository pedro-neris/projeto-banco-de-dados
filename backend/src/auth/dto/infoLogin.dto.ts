import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InfoLogin {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'minhasenha123',
    })
    @IsString()
    @IsNotEmpty()
    senha: string;
}

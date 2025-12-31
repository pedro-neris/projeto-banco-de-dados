import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nome de usuário único',
    example: 'joao_silva',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'minhasenha123',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  senha: string;
}

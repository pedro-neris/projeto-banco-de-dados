import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Nome de usuário único',
    example: 'joao_silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novasenha123',
    required: false,
  })
  @IsOptional()
  @IsString()
  senha?: string;
}

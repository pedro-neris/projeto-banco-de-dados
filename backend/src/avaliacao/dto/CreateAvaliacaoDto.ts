import { IsDate, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAvaliacaoDto {
  @ApiProperty({
    description: 'Nota da avaliação (1-5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  nota: number;

  @ApiProperty({
    description: 'Comentário da avaliação',
    example: 'Prato muito saboroso, recomendo!',
  })
  @IsNotEmpty()
  @IsString()
  texto: string;

  @ApiProperty({
    description: 'Data da avaliação',
    example: '2024-01-15T10:30:00Z',
  })
  @IsNotEmpty()
  data_avaliacao: Date | string;

  @ApiProperty({
    description: 'Data do consumo do prato',
    example: '2024-01-15T12:00:00Z',
  })
  @IsNotEmpty()
  data_consumo: Date | string;

  @ApiProperty({
    description: 'ID do usuário que fez a avaliação',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @ApiProperty({
    description: 'Tipo de refeição',
    example: 'Almoço',
    enum: ['Café da manhã', 'Almoço', 'Jantar', 'Lanche'],
  })
  @IsNotEmpty()
  @IsString()
  refeicao: string;

  @ApiProperty({
    description: 'ID do prato avaliado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_prato: number;
}

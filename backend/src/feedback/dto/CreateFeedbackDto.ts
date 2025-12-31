import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {

  @ApiProperty({
    description: 'Data do feedback',
    example: '2024-01-15T16:00:00Z',
  })
  @IsNotEmpty()
  data: Date | string;

  @ApiProperty({
    description: 'Texto do feedback',
    example: 'Sugestão para melhorar o atendimento no balcão.',
  })
  @IsNotEmpty()
  @IsString()
  texto: string;

  @ApiProperty({
    description: 'Tipo do feedback',
    example: 'Sugestão',
    enum: ['Sugestão', 'Reclamação', 'Elogio', 'Dúvida'],
  })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'ID do setor relacionado ao feedback',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_setor: number;

  @ApiProperty({
    description: 'ID do usuário que enviou o feedback',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}

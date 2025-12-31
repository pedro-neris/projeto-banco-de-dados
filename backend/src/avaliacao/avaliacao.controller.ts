import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/CreateAvaliacaoDto';
import { UpdateAvaliacaoDto } from './dto/UpdateAvaliacaoDto';
import { Avaliacao } from './avaliacao.entity';

@ApiTags('Avaliações')
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @ApiOperation({ summary: 'Criar nova avaliação' })
  @ApiResponse({ 
    status: 201, 
    description: 'Avaliação criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacaoService.createAvaliacao(dto);
  }

  @ApiOperation({ summary: 'Listar todas as avaliações' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de avaliações retornada com sucesso',
  })
  @Get()
  async findAll(): Promise<Avaliacao[]> {
    return await this.avaliacaoService.findAllAvaliacao();
  }

  @ApiOperation({ summary: 'Buscar avaliações de um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Avaliações do usuário encontradas',
  })
  @Get('user/:id')
  async findAvalsFromUser(@Param('id', ParseIntPipe) idUsuario: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromUser(idUsuario);
  }

  @ApiOperation({ summary: 'Buscar avaliação por ID' })
  @ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Avaliação encontrada',
  })
  @ApiResponse({ status: 404, description: 'Avaliação não encontrada' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Avaliacao | null> {
    return this.avaliacaoService.findAvaliacaoById(id);
  }

  @ApiOperation({ summary: 'Buscar avaliações de um prato com nome do usuário' })
  @ApiParam({ name: 'id', description: 'ID do prato', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Avaliações do prato encontradas',
  })
  @Get('prato/:id')
  async findAvalsFromPratoWithUserName(@Param('id', ParseIntPipe) idPrato: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromPratoWithUserName(idPrato);
  }

  @ApiOperation({ summary: 'Atualizar avaliação' })
  @ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Avaliação atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Avaliação não encontrada' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.updateAvaliacao(id, dto);
  }

  @ApiOperation({ summary: 'Deletar avaliação' })
  @ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Avaliação deletada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Avaliação não encontrada' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.avaliacaoService.deleteAvaliacao(id);
  }
}
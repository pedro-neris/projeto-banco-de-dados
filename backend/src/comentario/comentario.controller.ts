import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/CreateComentarioDto';
import { UpdateComentarioDto } from './dto/UpdateComentarioDto';
import { Comentario } from './comentario.entity';

@ApiTags('Comentários')
@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) { }

  @ApiOperation({ summary: 'Criar novo comentário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Comentário criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBearerAuth('JWT-auth')
  @Post()
  createComentario(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentarioService.createComentario(createComentarioDto);
  }

  @ApiOperation({ summary: 'Listar todos os comentários' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de comentários retornada com sucesso',
  })
  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @ApiOperation({ summary: 'Buscar comentário por ID' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário encontrado',
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
    return this.comentarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar comentários de uma avaliação' })
  @ApiParam({ name: 'idAvaliacao', description: 'ID da avaliação', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentários da avaliação encontrados',
  })
  @Get('avaliacao/:idAvaliacao')
  findComentariosFromAvaliacao(
    @Param('idAvaliacao', ParseIntPipe) idAvaliacao: number,
  ): Promise<Comentario[]> {
    return this.comentarioService.findComentariosFromAvaliacao(idAvaliacao);
  }

  @ApiOperation({ summary: 'Atualizar comentário' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    return this.comentarioService.updateComentario(id, updateComentarioDto);
  }

  @ApiOperation({ summary: 'Deletar comentário' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comentarioService.deleteComentario(id);
  }
}

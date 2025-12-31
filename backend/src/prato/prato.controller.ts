import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PratoService } from './prato.service';
import { Prato } from './prato.entity';
import { infoPrato } from './infoPrato.entity'

@ApiTags('Pratos')
@Controller('prato')
export class PratoController {
  constructor(private readonly pratoService: PratoService) { }

  @ApiOperation({ summary: 'Listar todos os pratos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pratos retornada com sucesso',
  })
  @Get()
  async findAll(): Promise<Prato[]> {
    return await this.pratoService.findAllPratos();
  }

  @ApiOperation({ summary: 'Buscar prato por ID' })
  @ApiParam({ name: 'id', description: 'ID do prato', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Prato encontrado',
  })
  @ApiResponse({ status: 404, description: 'Prato não encontrado' })
  @Get('id/:id')
  async findOnePrato(@Param('id', ParseIntPipe) id: number): Promise<Prato | null> {
    return this.pratoService.findOnePrato(id);
  }

  @ApiOperation({ summary: 'Listar informações detalhadas dos pratos' })
  @ApiResponse({
    status: 200,
    description: 'Informações detalhadas dos pratos retornadas com sucesso',
  })
  @Get('info')
  async findInfoPrato(): Promise<infoPrato[]> {
    return this.pratoService.findInfoPrato();
  }

  @ApiOperation({ summary: 'Buscar informações detalhadas de um prato' })
  @ApiParam({ name: 'id', description: 'ID do prato', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Informações detalhadas do prato encontradas',
  })
  @ApiResponse({ status: 404, description: 'Prato não encontrado' })
  @Get('info/:id')
  async findAllInfoPratoById(@Param('id', ParseIntPipe) id: number): Promise<infoPrato | null> {
    return this.pratoService.findInfoPratoById(id);
  }
}

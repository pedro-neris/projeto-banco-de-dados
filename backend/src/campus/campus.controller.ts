import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CampusService } from './campus.service';
import { Campus } from './campus.entity';

@ApiTags('Campus')
@Controller('campus')
/**
 * ⚠️ AVISO: Controller para fins educacionais.
 * Dados de campus fictícios para demonstração do sistema.
 */
export class CampusController {
  constructor(private readonly campusService: CampusService) { }

  @ApiOperation({ summary: 'Listar todos os campus' })
  @ApiResponse({
    status: 200,
    description: 'Lista de campus retornada com sucesso',
  })
  @Get()
  async findAll(): Promise<Campus[]> {
    return await this.campusService.findAllCampus();
  }

  @ApiOperation({ summary: 'Buscar campus por ID' })
  @ApiParam({ name: 'id', description: 'ID do campus', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Campus encontrado',
  })
  @ApiResponse({ status: 404, description: 'Campus não encontrado' })
  @Get(':id')
  async findOneCampus(@Param('id', ParseIntPipe) id: number): Promise<Campus | null> {
    return this.campusService.findOneCampus(id);
  }
}

import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SetorService } from './setor.service';
import { Setor } from './setor.entity'; 

@ApiTags('Setores')
@Controller('setor')
/**
 * ⚠️ AVISO: Controller para fins educacionais.
 * Dados de setores fictícios para demonstração do sistema.
 */
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @ApiOperation({ summary: 'Listar todos os setores' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de setores retornada com sucesso',
  })
  @Get()
  async findAll(): Promise<Setor[]> {
    return await this.setorService.findAllSetores();
  }

  @ApiOperation({ summary: 'Buscar setor por ID' })
  @ApiParam({ name: 'id', description: 'ID do setor', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Setor encontrado',
  })
  @ApiResponse({ status: 404, description: 'Setor não encontrado' })
  @Get(':id')
  async findOneSetor(@Param('id', ParseIntPipe) id: number): Promise<Setor | null> {
    return this.setorService.findOneSetor(id);
  }

  @ApiOperation({ summary: 'Buscar setores por campus' })
  @ApiParam({ name: 'idCampus', description: 'ID do campus', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Setores do campus encontrados',
  })
  @Get('campus/:idCampus')
  async findSetoresByCampus(@Param('idCampus') idCampus: number): Promise<Setor[]> {
    return this.setorService.findSetoresByCampus(idCampus);
  }
}

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
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/CreateAvaliacaoDto';
import { UpdateAvaliacaoDto } from './dto/UpdateAvaliacaoDto';
import { Avaliacao } from './avaliacao.entity';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @Post()
  async create(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacaoService.createAvaliacao(dto);
  }

  @Get()
  async findAll(): Promise<Avaliacao[]> {
    return await this.avaliacaoService.findAllAvaliacao();
  }

  @Get('user/:id')
  async findAvalsFromUser(@Param('id', ParseIntPipe) idUsuario: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromUser(idUsuario);
  }


  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Avaliacao | null> {
    return this.avaliacaoService.findAvaliacaoById(id);
  }

  @Get('prato/:id')
  async findAvalsFromPratoWithUserName(@Param('id', ParseIntPipe) idPrato: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromPratoWithUserName(idPrato);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.updateAvaliacao(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.avaliacaoService.deleteAvaliacao(id);
  }
}
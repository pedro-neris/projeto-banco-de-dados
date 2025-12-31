import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
import { UpdateFeedbackDto } from './dto/UpdateFeedbackDto';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @ApiOperation({ summary: 'Criar novo feedback' })
  @ApiResponse({
    status: 201,
    description: 'Feedback criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() newFeedback: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(newFeedback);
  }

  @ApiOperation({ summary: 'Listar todos os feedbacks' })
  @ApiResponse({
    status: 200,
    description: 'Lista de feedbacks retornada com sucesso',
  })
  @Get()
  async findAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedbacks();
  }

  @ApiOperation({ summary: 'Buscar feedbacks de um usuário' })
  @ApiParam({ name: 'idusuario', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Feedbacks do usuário encontrados',
  })
  @Get('user/:idusuario')
  async findFeedbacksFromUser(@Param('idusuario', ParseIntPipe) idusuario: number): Promise<Feedback[]> {
    return await this.feedbackService.findAllFeedbacksFromUser(idusuario);
  }

  @ApiOperation({ summary: 'Buscar feedback por ID' })
  @ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Feedback encontrado',
  })
  @ApiResponse({ status: 404, description: 'Feedback não encontrado' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feedback | null> {
    return this.feedbackService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar feedback' })
  @ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Feedback atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Feedback não encontrado' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() editedFeedback: UpdateFeedbackDto,
  ) {
    return this.feedbackService.updateFeedback(id, editedFeedback);
  }

  @ApiOperation({ summary: 'Deletar feedback' })
  @ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Feedback deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Feedback não encontrado' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.deleteFeedback(id);
  }
}

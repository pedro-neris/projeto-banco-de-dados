import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiParam({ name: 'email', description: 'Email do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findUserByEmail(email);
  }

  @ApiOperation({ summary: 'Buscar usuário por username' })
  @ApiParam({ name: 'username', description: 'Username do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }

  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}

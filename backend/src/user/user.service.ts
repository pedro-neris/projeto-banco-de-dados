import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) { }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE email = $1',
      [email],
    );
    return result.rows[0] as User ?? null;
  }

  async findUserById(id: number): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id],
    );
    return result.rows[0] as User ?? null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE username = $1',
      [username],
    );
    return result.rows[0] as User ?? null;
  }

  async createUser(novoUsuario: CreateUserDto) {
    const UserEmail = await this.findUserByEmail(novoUsuario.email);
    if (UserEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    const UserUsername = await this.findUserByUsername(novoUsuario.username);
    if (UserUsername) {
      throw new ConflictException('Nome de usuário em uso');
    }

    const result = await this.db.query(
      `INSERT INTO usuario (email, username, nome, senha)
       VALUES ($1, $2, $3, $4)`,
      [novoUsuario.email, novoUsuario.username, novoUsuario.nome,
      novoUsuario.senha],
    );

    return { message: "Usuário criado com sucesso" };
  }

  async findAllUsers(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM usuario');
    return result.rows as User[];
  }


  async updateUser(id: number, updates: UpdateUserDto) {
    const localUser = await this.findUserById(id);

    if (updates.email && updates.email !== localUser.email) {
      const UserEmail = await this.findUserByEmail(updates.email);
      if (UserEmail) {
        throw new ConflictException('Email já cadastrado');
      }
    }
    if (updates.username && updates.username !== localUser.username) {
      const UserUsername = await this.findUserByUsername(updates.username);
      if (UserUsername) {
        throw new ConflictException('Nome de usuário em uso');
      }
    }
    try {
      const result = await this.db.query(
        `UPDATE usuario 
        SET nome=$1, email=$2,
        username=$3, senha=$4
        WHERE id = $5 `, [
        updates.nome ?? localUser.nome,
        updates.email ?? localUser.email,
        updates.username ?? localUser.username,
        updates.senha ?? localUser.senha,
        id
      ]
      );

      return { message: "Usuário atualizado com sucesso " };
    } catch (error: any) {
      throw new InternalServerErrorException('Atualização falhou');
    }
  }

  async deleteUser(id: number) {
    const deletingUser = await this.findUserById(id);
    if (!deletingUser) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    const result = await this.db.query(
      'DELETE FROM usuario WHERE id = $1',
      [id],
    );
    return {
      message: `Usuário com id ${id} deletado com sucesso`,
    }
  }
}
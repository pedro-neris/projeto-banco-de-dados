import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';
import { CreateComentarioDto } from './dto/CreateComentarioDto';
import { UpdateComentarioDto } from './dto/UpdateComentarioDto';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentarioService {
  constructor(private db: DatabaseService) { }
  userService = new UserService(this.db);
  avaliacaoService = new AvaliacaoService(this.db);

  async createComentario(createComentarioDto: CreateComentarioDto) {
    const userExists = await this.userService.findUserById(
      createComentarioDto.id_usuario,
    );
    if (!userExists) {
      throw new NotFoundException('Não existe usuário com esse id');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      createComentarioDto.id_avaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'INSERT INTO comentario (texto, data, id_avaliacao, id_usuario) VALUES ($1, $2, $3, $4)',
      [
        createComentarioDto.texto,
        createComentarioDto.data,
        createComentarioDto.id_avaliacao,
        createComentarioDto.id_usuario,
      ],
    );
    return { message: "Comentário criado com sucesso!" };
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM comentario');
    return result.rows as Comentario[];
  }

  async findOne(id: number) {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0] as Comentario;
  }

  async updateComentario(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.findOne(id);

    const updatedComentario = {
      ...comentario,
      ...updateComentarioDto,
    };

    const userExists = await this.userService.findUserById(
      updatedComentario.id_usuario,
    );
    if (!userExists) {
      throw new ConflictException('Não existe usuário com esse id');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      updatedComentario.id_avaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'UPDATE comentario SET texto = $1, data = $2, id_avaliacao = $3, id_usuario = $4 WHERE id = $5',
      [
        updatedComentario.texto,
        updatedComentario.data,
        updatedComentario.id_avaliacao,
        updatedComentario.id_usuario,
        id,
      ],
    );
    return { message: "Comentário atualizado com sucesso!" };
  }

  async deleteComentario(id: number) {
    const result = await this.db.query(
      'DELETE FROM comentario WHERE id = $1',
      [id],
    );
    return {message:"Comentário excluído com sucesso!"};
  }

  async findComentariosFromAvaliacao(idAvaliacao: number,): Promise<Comentario[]> {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE id_avaliacao = $1',
      [idAvaliacao],
    );
    return result.rows as Comentario[];
  }
}

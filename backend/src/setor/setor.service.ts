import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Setor } from './setor.entity';
import { CampusService } from 'src/campus/campus.service';
@Injectable()
export class SetorService {
  constructor(private db: DatabaseService  ) { }
  campusService: CampusService = new CampusService(this.db);
  async findOneSetor(id: number): Promise<Setor | null> {
    const result = await this.db.query(
      'SELECT * FROM setor WHERE id = $1',
      [id],
    );
    return result.rows[0] as Setor ?? null;
  }
  async findAllSetores(): Promise<Setor[]> {
    const result = await this.db.query('SELECT * FROM setor');
    return result.rows as Setor[];
  }
  async findSetoresByCampus(idCampus: number): Promise<Setor[]> {
    const campusExists = this.campusService.findOneCampus(idCampus);
    if (!campusExists) {
      throw new NotFoundException('Campus não encontrado');
    }
    const result = await this.db.query(
      'SELECT * FROM setor WHERE id_campus = $1',
      [idCampus],
    );
    return result.rows as Setor[];
  }
}

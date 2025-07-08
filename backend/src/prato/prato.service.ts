import {
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prato } from './prato.entity';
import { infoPrato } from './infoPrato.entity';
@Injectable()
export class PratoService {
  constructor(private db: DatabaseService) { }

  async findOnePrato(id: number): Promise<Prato | null> {
    const result = await this.db.query(
      'SELECT * FROM Prato WHERE id = $1',
      [id],
    );
    return result.rows[0] as Prato ?? null;
  }
  async findAllPratos(): Promise<Prato[]> {
    const result = await this.db.query('SELECT * FROM Prato');
    return result.rows.map(prato => ({
      ...prato,
      icone: prato.icone ? prato.icone.toString('base64') : null,
    }));
  }

  async findInfoPrato(): Promise<infoPrato[]> {
    const result = await this.db.query('SELECT * FROM media_prato');
     return result.rows.map(prato => ({
      ...prato,
      icone: prato.icone ? prato.icone.toString('base64') : null,
    }));
  }
  async findInfoPratoById(id: number): Promise<infoPrato | null> {
    const result = await this.db.query(
      'SELECT * FROM media_prato WHERE id = $1',
      [id],
    );
    return result.rows[0].map(prato => ({
      ...prato,
      icone: prato.icone ? prato.icone.toString('base64') : null,
    })) as infoPrato ?? null;
  }

async findAllInfoPratoById(id: number): Promise<infoPrato | null> {
  const result = await this.db.query(
    `
    SELECT 
      p.id,
      p.nome,
      p.icone,
      COUNT(a.id) AS qtd_avaliacoes,
      AVG(a.nota) AS media_avaliacoes,
      (
        SELECT COUNT(*) 
        FROM cardapio_prato cp 
        WHERE cp.id_prato = p.id
      ) AS qtd_cardapios
    FROM prato p
    LEFT JOIN avaliacao a ON a.id_prato = p.id
    WHERE p.id = $1
    GROUP BY p.id, p.nome, p.icone
    `,
    [id]
  );

  return result.rows[0] || null;
}
}

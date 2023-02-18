import { PgSqlPool } from '../../../../common/persistense/pgsql.persistence';
import { Emotion } from '../../domain/emotion';
import { EmotionRepository } from '../../emotion.repository';

export class EmotionPgSqlRepository implements EmotionRepository {
  constructor(private readonly pgSqlPool: PgSqlPool) {}

  public async find(id: number): Promise<Emotion | null> {
    const data = await this.pgSqlPool
      .createPgSqlPool()
      .query('SELECT * FROM emotion WHERE id=$1', [id]);

    if (data.rowCount) {
      return data.rows[0] as Emotion;
    }

    return null;
  }

  public async findAllByUser(userId: number): Promise<Emotion[]> {
    const data = await this.pgSqlPool
      .createPgSqlPool()
      .query('SELECT * FROM emotion WHERE user_id=$1', [userId]);

    return data.rows as Emotion[];
  }

  public async all(): Promise<Emotion[]> {
    const data = await this.pgSqlPool
      .createPgSqlPool()
      .query('SELECT * FROM emotion ORDER BY id DESC');

    return data.rows as Emotion[];
  }

  public async store(entry: Emotion): Promise<void> {
    const createdAt = new Date();

    await this.pgSqlPool
      .createPgSqlPool()
      .query(
        'INSERT INTO emotion(user_id, name, description, body_part, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          entry.user_id,
          entry.name,
          entry.description,
          entry.bodyPart,
          createdAt,
          createdAt,
        ]
      );
  }

  public async update(entry: Emotion): Promise<void> {
    const updatedAt = new Date();
    await this.pgSqlPool
      .createPgSqlPool()
      .query(
        'UPDATE emotion SET user_id = $1, name = $2, description = $3, body_part = $4, updated_at = $5 WHERE id = $6',
        [
          entry.user_id,
          entry.name,
          entry.description,
          entry.bodyPart,
          updatedAt,
          entry.id,
        ]
      );
  }

  public async remove(id: number): Promise<void> {
    await this.pgSqlPool
      .createPgSqlPool()
      .query('DELETE FROM emotion  WHERE id = $1', [id]);
  }
}

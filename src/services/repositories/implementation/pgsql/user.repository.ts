import { PgSqlPool } from '../../../../common/persistense/pgsql.persistence';
import { User } from '../../domain/user';
import { UserRepository } from '../../user.repository';

export class UserPgSqlRepository implements UserRepository {
  constructor(private readonly pgSqlPool: PgSqlPool) {}

  public async find(document: number): Promise<User | null> {
    const data = await this.pgSqlPool
      .createPgSqlPool()
      .query('SELECT * FROM users WHERE document=$1', [document]);

    if (data.rowCount) {
      return data.rows[0] as User;
    }

    return null;
  }

  public async all(): Promise<User[]> {
    const data = await this.pgSqlPool
      .createPgSqlPool()
      .query('SELECT * FROM users ORDER BY id DESC');

    return data.rows as User[];
  }

  public async store(entry: User): Promise<void> {
    const createdAt = new Date();
    await this.pgSqlPool
      .createPgSqlPool()
      .query(
        'INSERT INTO users(document, created_at, updated_at) VALUES ($1, $2, $3)',
        [entry.document, createdAt, createdAt]
      );
  }

  public async remove(id: number): Promise<void> {
    await this.pgSqlPool
      .createPgSqlPool()
      .query('DELETE FROM users  WHERE id = $1', [id]);
  }
}

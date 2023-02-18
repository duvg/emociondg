import { Pool } from 'pg';

export class PgSqlPool {
  dbUser: string | undefined;
  dbPass: string | undefined;
  dbServer: string | undefined;
  dbPort: string | undefined;
  dbName: string | undefined;

  constructor() {
    this.dbUser = process.env.DB_PGSQL_USER && '';
    this.dbPass = process.env.DB_PGSQL_PASS && '';
    this.dbServer = process.env.DB_PGSQL_SERVER && '';
    this.dbPort = process.env.DB_PGSQL_PORT && '';
    this.dbName = process.env.DB_PGSQL_NAME && '';
  }

  public createPgSqlPool(): Pool {
    return new Pool({
      max: 20,
      connectionString: `postgres://useradmin:admin@localhost/emociondb`,
      idleTimeoutMillis: 3000,
    });
  }
}

// connectionString: `postgress://${this.dbUser}:${this.dbPass}@${this.dbServer}:${this.dbPort}/${this.dbPass}`,

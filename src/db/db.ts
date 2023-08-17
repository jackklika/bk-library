import { Pool, QueryResult, QueryResultRow } from 'pg';

export class DB {
  host: string = "localhost";
  port: number = 5439; // non standard
  user: string = "postgres";
  password: string = "password";
  database: string = "postgres";

  pool: Pool;

  // todo: set up configuration from config file and allow arguments
  constructor() {
    this.pool = new Pool({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }

  async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }

  async close() {
    await this.pool.end();
  }

}

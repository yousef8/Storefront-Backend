import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get users: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=$1";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user cause of: ${err}`);
    }
  }

  async create(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    // Hashing the password
    let hash: string;
    try {
      hash = bcrypt.hashSync(
        password,
        parseInt(process.env.ENV as unknown as string)
      );
    } catch (err) {
      throw new Error(`Unable to hash the password cause of: ${err}`);
    }

    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [firstName, lastName, hash]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable create user cause of: ${err}`);
    }
  }
}

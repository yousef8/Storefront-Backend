import { connect } from "http2";
import { resourceLimits } from "worker_threads";
import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products: ${err}`);
    }
  }

  async create(
    name: string,
    price: number,
    category: string
  ): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [name, price, category]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable create product: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get product cause of: ${err}`);
    }
  }

  async updatePrice(value: number, id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE products SET price = $1 WHERE id = $2 RETURNING *";

      const result = await conn.query(sql, [value, id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable update price cause of: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable delete product cause of: ${err}`);
    }
  }

  async categoryProducts(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE category=$1";

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get category products: ${err}`);
    }
  }
}

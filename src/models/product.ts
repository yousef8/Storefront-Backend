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

import Client from "../database";

export type Order = {
  id: number;
  status: string;
  user_id: number;
};

export type orderProduct = {
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get orders cause of: ${err}`);
    }
  }

  async create(status: string, userId: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";

      const result = await conn.query(sql, [status, userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable create order cause of: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING *";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable delete order: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<orderProduct> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable add product to order cause of: ${err}`);
    }
  }

  async currentUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'active' AND user_id = $1";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get current user orders cause of: ${err}`);
    }
  }

  async completedUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'complete' AND user_id = $1";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get completed user orders cause of: ${err}`);
    }
  }
}

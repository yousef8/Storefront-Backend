import Client from "../../database";
import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Testing Orders Endpoint", () => {
  let yousef_token: string;
  beforeAll(async function setDatabase() {
    try {
      const res = await request
        .post("/users/create")
        .send({ first_name: "yousef", last_name: "doe", password: "password" });
      yousef_token = res.body.token;
      await request
        .post("/products/create")
        .send({ name: "rapoo", price: 500, category: "electronics" })
        .auth(yousef_token, { type: "bearer" });
      await request
        .post("/products/create")
        .send({ name: "candySkull", price: 5000, category: "electronics" })
        .auth(yousef_token, { type: "bearer" });
    } catch (err) {
      throw new Error(`Unable set database for orders endpoint cause: ${err}`);
    }
  });

  afterAll(async function resetTable() {
    try {
      const conn = await Client.connect();
      const downSql = "DROP TABLE products, users, orders, order_products;";
      const upSqlThree =
        "CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR(15), user_id integer, CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id))";
      const upSqlFour =
        "CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity integer, order_id integer, product_id integer, CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id), CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id))";
      const upSqlTwo =
        "CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price integer NOT NULL, category VARCHAR(100))";
      const upSqlOne =
        "CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100), password VARCHAR NOT NULL)";
      await conn.query(downSql);
      await conn.query(upSqlOne);
      await conn.query(upSqlTwo);
      await conn.query(upSqlThree);
      await conn.query(upSqlFour);

      conn.release();
    } catch (err) {
      throw new Error(`Unable reset tables cause of: ${err}`);
    }
  });

  describe("Testing Create Method", () => {
    it("should create active order", async () => {
      const res = await request
        .post("/orders/create")
        .send({ status: "active", user_id: 1 });
      expect(res.body).toEqual({ id: 1, status: "active", user_id: 1 });
    });

    it("should create complete order", async () => {
      const res = await request
        .post("/orders/create")
        .send({ status: "complete", user_id: 1 });
      expect(res.body).toEqual({ id: 2, status: "complete", user_id: 1 });
    });
  });

  describe("Testing index Method", () => {
    it("should get all orders", async () => {
      const res = await request.get("/orders");
      expect(res.body.length).toEqual(2);
    });
  });

  describe("Testing addProduct Method", () => {
    it("should add first product to active order", async () => {
      const res = await request
        .post("/orders/1/add/product")
        .send({ quantity: 3, product_id: 1 });
      expect(res.body).toEqual({
        id: 1,
        quantity: 3,
        order_id: 1,
        product_id: 1,
      });
    });

    it("should add second product to complete order", async () => {
      const res = await request
        .post("/orders/2/add/product")
        .send({ quantity: 4, product_id: 2 });
      expect(res.body).toEqual({
        id: 2,
        quantity: 4,
        order_id: 2,
        product_id: 2,
      });
    });
  });

  describe("Testing currentUserOrders method", () => {
    it("should return order id 1", async () => {
      const res = await request
        .get("/orders/active/1")
        .auth(yousef_token, { type: "bearer" });
      expect(res.body[0]).toEqual({ id: 1, status: "active", user_id: 1 });
    });
  });
  describe("Testing completedUserOrders method", () => {
    it("should return order id 2", async () => {
      const res = await request
        .get("/orders/complete/1")
        .auth(yousef_token, { type: "bearer" });
      expect(res.body[0]).toEqual({ id: 2, status: "complete", user_id: 1 });
    });
  });

  describe("Testing delete method", () => {
    it("should delete complete order", async () => {
      const res = await request.delete("/orders/delete/2");
      expect(res.body).toEqual({ id: 2, status: "complete", user_id: 1 });
    });
  });
});

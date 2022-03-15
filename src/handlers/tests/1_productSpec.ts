import supertest from "supertest";
import app from "../../app";
import Client from "../../database";

const request = supertest(app);

describe("Testing Product Endpoint", () => {
  let token: string;
  beforeAll(async function getToken() {
    try {
      const res = await request
        .post("/users/create")
        .send({ first_name: "john", last_name: "doe", password: "password" });
      token = res.body.token;
    } catch (err) {
      throw new Error(`Unable get credential cause of: ${err}`);
    }
  });

  afterAll(async () => {
    try {
      const conn = await Client.connect();
      const sqlFirst = "DROP TABLE products, users CASCADE";
      const sqlSecond =
        "CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price integer NOT NULL, category VARCHAR(100))";
      const sqlThird =
        "CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100), password VARCHAR NOT NULL)";

      await conn.query(sqlFirst);
      await conn.query(sqlSecond);
      await conn.query(sqlThird);

      conn.release();
    } catch (err) {
      throw new Error(`Unable reset product table cause of: ${err}`);
    }
  });

  describe("Testing Create Method", () => {
    it("should create first product rapoo mouse", async () => {
      const res = await request
        .post("/products/create")
        .send({ name: "rapoo mouse", price: 500, category: "electronics" })
        .auth(token, { type: "bearer" });
      expect(res.body.id).toEqual(1);
    });

    it("should create second product CandySkull headset", async () => {
      const res = await request
        .post("/products/create")
        .send({
          name: "CandySkull Headset",
          price: 5000,
          category: "electronics",
        })
        .auth(token, { type: "bearer" });
      expect(res.body.id).toEqual(2);
    });
  });

  describe("Testing index method", () => {
    it("should return empty list of products", async () => {
      const response = await request.get("/products");

      expect(response.body.length).toEqual(2);
      expect(response.status).toEqual(200);
    });
  });

  describe("Testing Show Method", () => {
    it("should get CandySkull product with id 2", async () => {
      const res = await request.get("/products/2");
      expect(res.body.name).toEqual("CandySkull Headset");
    });
  });

  describe("Testing updatePrice Method", () => {
    it("should update rapoo mouse product price to 700", async () => {
      const res = await request.put("/products/update/1").send({ price: 700 });
      expect(res.body).toEqual({
        id: 1,
        name: "rapoo mouse",
        price: 700,
        category: "electronics",
      });
    });
  });

  describe("Testing Destroy Method", () => {
    it("should delete rapoo mouse product", async () => {
      const res = await request.delete("/products/delete/1");
      expect(res.body).toEqual({
        id: 1,
        name: "rapoo mouse",
        price: 700,
        category: "electronics",
      });
    });
  });

  describe("Testing categoryProducts Method", () => {
    it("should get all products of electronics category", async () => {
      const res = await request.get("/products/category/electronics");
      expect(res.body.length).toEqual(1);
      expect(res.body[0].id).toEqual(2);
    });
  });
});

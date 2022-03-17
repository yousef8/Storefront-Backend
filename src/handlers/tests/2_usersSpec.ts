import supertest from "supertest";
import Client from "../../database";
import app from "../../app";
import { toEditorSettings } from "typescript";

const request = supertest(app);

describe("Testing Users Endpoint", () => {
  afterAll(async function clearTable() {
    try {
      const conn = await Client.connect();
      const sqlFirst = "DROP TABLE users cascade";
      const sqlSecond =
        "CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100), password VARCHAR NOT NULL)";

      await conn.query(sqlFirst);
      await conn.query(sqlSecond);

      conn.release();
    } catch (err) {
      throw new Error(`Unable to reset users table cause of: ${err}`);
    }
  });

  let yousef_token: string;
  let john_token: string;

  describe("Testing Create Method", () => {
    it("should create yousef doe first user", async () => {
      try {
        const res = await request.post("/users/create").send({
          first_name: "yousef",
          last_name: "doe",
          password: "password",
        });
        yousef_token = res.body.token;
        expect(res.body.id).toEqual(1);
        expect(res.body.first_name).toEqual("yousef");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });

    it("should create john doe second user", async () => {
      try {
        const res = await request
          .post("/users/create")
          .send({ first_name: "john", last_name: "doe", password: "password" });
        john_token = res.body.token;
        expect(res.body.id).toEqual(2);
        expect(res.body.first_name).toEqual("john");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing index Method", () => {
    it("should get 2 users", async () => {
      try {
        const res = await request
          .get("/users")
          .auth(yousef_token, { type: "bearer" });
        expect(res.body.length).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing show Method", () => {
    it("should get user yousef whom id is 1", async () => {
      try {
        const res = await request
          .get("/users/1")
          .auth(yousef_token, { type: "bearer" });
        expect(res.body.id).toEqual(1);
        expect(res.body.first_name).toEqual("yousef");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing delete Method", () => {
    it("Should delete john doe user", async () => {
      try {
        const res = await request
          .delete("/users/delete/2")
          .auth(yousef_token, { type: "bearer" });
        expect(res.body.id).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });
});

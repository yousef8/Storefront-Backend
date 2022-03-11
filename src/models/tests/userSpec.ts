import { User, UserStore } from "../user";

const store = new UserStore();

describe("Testing User Model", () => {
  describe("Testing create method", () => {
    it("should create user yousef", async () => {
      const yousef = await store.create("yousef", "doe", "password");
      expect(yousef.id).toEqual(1);
    });
  });

  describe("Testing index method", () => {
    it("should index be defined", () => {
      expect(store.index()).toBeDefined();
    });

    it("should return list contain 1 user", async () => {
      const users = await store.index();
      expect(users.length).toEqual(1);
    });
  });

  describe("Testing show method", () => {
    it("should return user yousef", async () => {
      const yousef = await store.show(1);
      expect(yousef.first_name).toEqual("yousef");
    });
  });
});

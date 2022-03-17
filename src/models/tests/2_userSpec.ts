import { User, UserStore } from "../user";

const store = new UserStore();

describe("Testing User Model", () => {
  describe("Testing create method", () => {
    it("should create user yousef", async () => {
      try {
        const yousef = await store.create("yousef", "doe", "password");
        const user2 = await store.create("jon", "doe", "password");
        expect(yousef.id).toEqual(1);
        expect(user2.id).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing index method", () => {
    it("should index be defined", () => {
      expect(store.index()).toBeDefined();
    });

    it("should return list contain 2 user", async () => {
      try {
        const users = await store.index();
        expect(users.length).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing show method", () => {
    it("should return user yousef", async () => {
      try {
        const yousef = await store.show(1);
        expect(yousef.first_name).toEqual("yousef");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing delete mehod", () => {
    it("should delete user jon doe", async () => {
      try {
        const user2 = await store.delete(2);
        expect(user2.id).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });
});

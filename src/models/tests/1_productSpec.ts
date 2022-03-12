import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Testing Product Model", () => {
  describe("Testing the index method", () => {
    it("should have an index method", () => {
      expect(store.index()).toBeDefined();
    });

    it("index method should return empty array of products", async () => {
      const products = await store.index();
      expect(products).toEqual([]);
    });
  });

  describe("Testing the create method", () => {
    it("should return the created product", async () => {
      const product = await store.create("iphone", 50000, "mobiles");
      expect(product).toEqual({
        id: 1,
        name: "iphone",
        price: 50000,
        category: "mobiles",
      });
    });
  });

  describe("Testing categoryProducts method", () => {
    it("should return list of products", async () => {
      const products = await store.categoryProducts("mobiles");
      const product = await store.create("light zaber", 300, "nerd");
      expect(products).toEqual([
        {
          id: 1,
          name: "iphone",
          price: 50000,
          category: "mobiles",
        },
      ]);
    });
  });
});

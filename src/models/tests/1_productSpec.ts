import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Testing Product Model", () => {
  describe("Testing the index method", () => {
    it("should have an index method", () => {
      expect(store.index()).toBeDefined();
    });

    it("index method should return empty array of products", async () => {
      try {
        const products = await store.index();
        expect(products).toEqual([]);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing the create method", () => {
    it("should return the created product", async () => {
      try {
        const product = await store.create("iphone", 50000, "mobiles");
        expect(product).toEqual({
          id: 1,
          name: "iphone",
          price: 50000,
          category: "mobiles",
        });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing categoryProducts method", () => {
    it("should return list of products", async () => {
      try {
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
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing show method", () => {
    it("should return light zaber product with id = 2", async () => {
      try {
        const product = await store.show(2);
        expect(product).toEqual({
          id: 2,
          name: "light zaber",
          price: 300,
          category: "nerd",
        });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing update method", () => {
    it("should return product with id=2 with price 1000", async () => {
      try {
        const product = await store.updatePrice(1000, 2);
        expect(product.price).toEqual(1000);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing delete method", () => {
    it("should delete product id = 2", async () => {
      try {
        const product = await store.delete(2);
        expect(product).toEqual({
          id: 2,
          name: "light zaber",
          price: 1000,
          category: "nerd",
        });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });
});

import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Testing Order Model", () => {
  describe("Testing create method", () => {
    it("should create active order", async () => {
      try {
        const order = await store.create("active", 1);
        expect(order).toEqual({ id: 1, status: "active", user_id: 1 });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });

    it("should create completed order", async () => {
      try {
        const order = await store.create("complete", 1);
        expect(order).toEqual({ id: 2, status: "complete", user_id: 1 });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing index method", () => {
    it("index method should retrun list of two orders", async () => {
      try {
        const orders = await store.index();
        expect(orders.length).toEqual(2);
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing currentUserOrders method", () => {
    it("should return list of 1 active order", async () => {
      try {
        const orders = await store.currentUserOrders(1);
        expect(orders.length).toEqual(1);
        expect(orders[0].status).toEqual("active");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing completedUserOrders method", () => {
    it("should return list of 1 complete order", async () => {
      try {
        const orders = await store.completedUserOrders(1);
        expect(orders.length).toEqual(1);
        expect(orders[0].status).toEqual("complete");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing addProduct method", () => {
    it("should add one product to order with id = 1", async () => {
      try {
        const product = await store.addProduct(3, 1, 1);
        expect(product).toEqual({
          id: 1,
          quantity: 3,
          order_id: 1,
          product_id: 1,
        });
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });

  describe("Testing delete method", () => {
    it("should delete completed order with id 2", async () => {
      try {
        const order = await store.delete(2);
        expect(order.status).toEqual("complete");
      } catch (err) {
        throw new Error(`Unable operate test cause of: ${err}`);
      }
    });
  });
});

import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Testing Order Model", () => {
  describe("Testing create method", () => {
    it("should create active order", async () => {
      const order = await store.create("active", 1);
      expect(order).toEqual({ id: 1, status: "active", user_id: 1 });
    });

    it("should create completed order", async () => {
      const order = await store.create("complete", 1);
      expect(order).toEqual({ id: 2, status: "complete", user_id: 1 });
    });
  });

  describe("Testing index method", () => {
    it("index method should retrun list of two orders", async () => {
      const orders = await store.index();
      expect(orders.length).toEqual(2);
    });
  });

  describe("Testing currentUserOrders method", () => {
    it("should return list of 1 active order", async () => {
      const orders = await store.currentUserOrders(1);
      expect(orders.length).toEqual(1);
      expect(orders[0].status).toEqual("active");
    });
  });

  describe("Testing completedUserOrders method", () => {
    it("should return list of 1 complete order", async () => {
      const orders = await store.completedUserOrders(1);
      expect(orders.length).toEqual(1);
      expect(orders[0].status).toEqual("complete");
    });
  });

  describe("Testing addProduct method", () => {
    it("should add one product to order with id = 1", async () => {
      const product = await store.addProduct(3, 1, 1);
      expect(product).toEqual({
        id: 1,
        quantity: 3,
        order_id: 1,
        product_id: 1,
      });
    });
  });

  describe("Testing delete method", () => {
    it("should delete completed order with id 2", async () => {
      const order = await store.delete(2);
      expect(order.status).toEqual("complete");
    });
  });
});

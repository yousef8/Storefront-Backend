import { Order, orderProduct, OrderStore } from "../models/order";
import express, { Request, Response } from "express";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders: Order[] = await store.index();
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  const status: string = req.body.status;
  const userId: number = parseInt(req.body.user_id);

  const order: Order = await store.create(status, userId);
  res.json(order);
};

const destroy = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const order: Order = await store.delete(id);
  res.json(order);
};

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: number = parseInt(req.params.id);
  const productId: number = parseInt(req.body.product_id);

  const addedProduct: orderProduct = await store.addProduct(
    quantity,
    orderId,
    productId
  );
  res.json(addedProduct);
};

const currentUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  const orders: Order[] = await store.currentUserOrders(userId);
  res.json(orders);
};

const completedUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);

  const orders: Order[] = await store.completedUserOrders(userId);
  res.json(orders);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.post("/orders/create", create);
  app.delete("/orders/delete/:id", destroy);
  app.post("/orders/:id/add/product", addProduct);
  app.get("/orders/active/:userId", currentUserOrders);
  app.get("/orders/complete/:userId", completedUserOrders);
};

export default orderRoutes;

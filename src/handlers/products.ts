import express from "express";
import { Product, ProductStore } from "../models/product";
import { verifyToken } from "../middleware/security";

const store = new ProductStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products: Product[] = await store.index();
    res.json(products);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product: Product = await store.show(id);
    res.json(product);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const name: string = req.body.name;
    const price: number = parseInt(req.body.price);
    const category: string = req.body.category;

    const product: Product = await store.create(name, price, category);
    res.json(product);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const id: number = parseInt(req.params.id as string);
    const price: number = parseInt(req.body.price);

    const product: Product = await store.updatePrice(price, id);
    res.json(product);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const id: number = parseInt(req.params.id);

    const product: Product = await store.delete(id);
    res.json(product);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const categoryProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const category: string = req.params.category;

    const products: Product[] = await store.categoryProducts(category);
    res.json(products);
  } catch (err) {
    throw new Error(`Unable operate Endpoint cause of: ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products/create", verifyToken, create);
  app.put("/products/update/:id", update);
  app.delete("/products/delete/:id", destroy);
  app.get("/products/category/:category", categoryProducts);
};

export default productRoutes;

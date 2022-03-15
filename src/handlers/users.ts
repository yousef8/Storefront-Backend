import { User, UserStore } from "../models/user";
import express from "express";

const store = new UserStore();

const index = async (_req: express.Request, res: express.Response) => {
  const users: User[] = await store.index();
  res.json(users);
};

const show = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id);
  const user: User = await store.show(id);
  res.json(user);
};

const create = async (req: express.Request, res: express.Response) => {
  const firstName: string = req.body.first_name;
  const lastName: string = req.body.last_name;
  const password: string = req.body.password;

  const user: User = await store.create(firstName, lastName, password);
  res.json(user);
};

const destroy = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id);

  const user: User = await store.delete(id);
  res.json(user);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users/create", create);
  app.delete("/users/delete/:id", destroy);
};

export default userRoutes;

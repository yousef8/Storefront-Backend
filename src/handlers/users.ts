import { User, UserStore } from "../models/user";
import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/security";
import dotenv from "dotenv";
dotenv.config();

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
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    process.env.TOKEN_SECRET as unknown as string
  );
  res.json({ ...user, token: token });
};

const destroy = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id);
  const user: User = await store.delete(id);
  res.json(user);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users/create", create);
  app.delete("/users/delete/:id", verifyToken, destroy);
};

export default userRoutes;

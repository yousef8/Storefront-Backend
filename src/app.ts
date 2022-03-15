import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/products";
import userRoutes from "./handlers/users";
import orderRoutes from "./handlers/orders";

const app: express.Application = express();

app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default app;

import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: () => void
) {
  try {
    const authoriztionHeader: string = req.headers
      .authorization as unknown as string;
    const token = authoriztionHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as unknown as string
    );
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
  }
}

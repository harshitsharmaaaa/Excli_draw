import { NextFunction , Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
export function middleware(req:Request, res:Response, next:NextFunction) {
    const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded){
       // @ts-ignore: TODO: Fix this
      req.userId  = decoded.userId ;
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
  next();
}
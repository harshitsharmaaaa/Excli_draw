import express from "express";
import jwt from "jsonwebtoken";
// import {JWT_SECRET}  from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { createuserSchema ,signinSchema,createRoomSchema} from "@repo/common/types";
import {client} from "@repo/db/client";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/signup", async(req, res) => {

  const data = createuserSchema.safeParse(req.body);
  if(!data.success){
      res.status(400).json({error:data.error});
      return;
  }

  try {
    await client.user.create({
      data:{
        email:data.data?.username,
        name:data.data?.name,
        password:data.data?.password,
      }
  })
  res.json({
    userId:123,
  })
  } catch (error) {
    res.status(400).json({
      message:error,
    });
  }
});


app.post("/signin", (req, res) => {
    const data = signinSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({error:data.error});
        return;
    }
});

app.post("/room", middleware,(req, res) => {
  const data = createRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ error: data.error });
    return;
  } 
});
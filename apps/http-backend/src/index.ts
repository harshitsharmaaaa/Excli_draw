import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { createuserSchema ,signinSchema,createRoomSchema} from "@repo/common/types";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/signup", (req, res) => {

  const data = createuserSchema.safeParse(req.body);
  if (data.success) {
    res.json({ userId: 1 });
    return;
  }
  res.status(400).json({ error: data.error });
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
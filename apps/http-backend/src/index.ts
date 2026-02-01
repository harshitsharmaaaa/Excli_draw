import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/signup", (req, res) => {
    res.json({ userId: 1 });

});

app.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.send({ token });
});

app.post("/room", middleware,(req, res) => {
    res.json({ roomId: 1 });
});
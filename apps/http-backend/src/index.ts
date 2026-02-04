import express from "express";
import jwt from "jsonwebtoken";
// import {JWT_SECRET}  from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { createuserSchema ,signinSchema,createRoomSchema} from "@repo/common/types";
import {Client} from "@repo/db/client";
import { JWT_SECRET } from "@repo/backend-common/config";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});

app.post("/signup", async(req, res) => {

  const data = createuserSchema.safeParse(req.body);
  if(!data.success){
      res.status(400).json({error:data.error});
      return;
  }

  try {
    const user = await Client.user.create({
      data:{
        email:data.data?.username,
        name:data.data?.name,
        password:data.data?.password,
      }
  })
  res.json({
    userId:user.id,
  })
  } catch (error) {
    res.status(400).json({
      message:error,
    });
  }
});


app.post("/signin", async(req, res) => {
    const data = signinSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({error:data.error});
        return;
    }

    const user = await Client.user.findFirst({
        where:{
          email:data.data?.username,
          password:data.data?.password,
        }
    })
    if(!user){
        res.status(400).json({error:"the user does not exist"});
        return;
    }
    const token = jwt.sign({
      userId:user?.id,

    },JWT_SECRET);
    res.json({
      token
    })
});

app.post("/room", middleware,async(req, res) => {

  const data = createRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ error: data.error });
    return;
  }
  //@ts-ignore: TODO: fix this
  const userId = req.userId;

  

  try {
    await Client.room.create({
      data:{
        slug:data.data?.name,
        adminId:userId,
      }
    })
  
    res.json({
      roomId: 123,
      
    });
  } catch (error) {
    res.status(400).json({
      message:"There is already a room with this name",
    });
  }
});

app.get("/chats/:roomId",async(req, res) => {
  const roomId = Number(req.params.roomId);
  const message = Client.chat.findMany({
    where:{
      roomId,
      
    },
    orderBy:{
      id:"desc",
    },
    take:50,
  })

  res.json(message);

})
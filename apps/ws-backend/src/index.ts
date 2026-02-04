import  { WebSocket ,WebSocketServer } from "ws";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import {Client} from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    ws: WebSocket;
    userId: string;
    rooms: string[];
}

const users: User[] = [];

function CheckUser(token: string):string |null{
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    
        if( typeof decoded == "string"){
            return null;
           
        }
    
        if(!decoded || !(decoded as JwtPayload).userId){
            return null;
        }
    
        return decoded.userId;
    } catch (error) {
        console.log("doesn't get the right token");
        return null;
    }
}

wss.on("connection", (ws:WebSocket,req) => {
    const url = req.url;

    if(!url){
        return ;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const userID = CheckUser(token);

    if(!userID){
        ws.close();
        return;
    }

    users.push({
        ws,
        userId:userID,
        rooms: []
    })

    ws.on("message", async function message(data) {
        const parsedData = JSON.parse(data as unknown as string);
        
        if(parsedData.type == "join_room"){
            const user  = users.find(x=> x.ws ===ws);
            if(!user){
                return;
            }
            user.rooms.push(parsedData.roomId);
        }


        if(parsedData.type == "leave_room"){
            const user= users.find(x=> x.ws ===ws);
            if(!user){
                return;
            }
            user.rooms= user?.rooms.filter(x=> x !== parsedData.roomId);
        }

        if(parsedData.type == "chat"){
            const room = parsedData.roomId;
            const message = parsedData.message;

            await Client.chat.create({
                data:{
                    roomId:room,
                    message,
                    userId:userID
                }
            })

            users.forEach(user=>{
                if(user.rooms.includes(room)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message,
                        room
                    }));
                }
            })

        }
    });

});
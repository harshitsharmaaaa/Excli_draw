"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";


export function ChatRoomClient({
    messages,
    id,
}:{
    messages:{message:string}[],
    id:string,
})
{
    const {socket,loading} = useSocket();
    const [currentMessage, setCurrentMessage] = useState("");
    const [chats,setChats] = useState(messages);
    useEffect(() => {
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id,
            }))
            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data as string);
                if(parsedData.type === "chat"){
                    setChats([...chats,parsedData.message]);
                }
            } 
        }
    },[socket,loading,id])

    return (
        <div>
            {chats.map(m=><div>{m.message}</div>)}
            <input type="text" value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)} } placeholder="Type your message here"/>

            <button onClick={()=>{
                if(socket && !loading){
                    socket.send(JSON.stringify({
                        type:"chat",
                        message:currentMessage,
                        roomId:id,
                    }))
                    setCurrentMessage("");
                }
            }}>Send</button>
        </div>
        
    )
}
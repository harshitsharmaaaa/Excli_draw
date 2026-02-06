import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChat(roomId:string){
    const response =await  axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.message;
}


export async function ChatRoom({id}:{id:string}){

    const messages = await getChat(id) as {message:string}[];

    return (
        <div>
        <ChatRoomClient messages={messages} id={id}></ChatRoomClient>
        </div>
    )

}

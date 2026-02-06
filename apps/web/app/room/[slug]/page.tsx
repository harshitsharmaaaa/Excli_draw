
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { WEBSOCKET_URL} from "../../../config";
import { ChatRoomClient } from "../../../component/ChatRoomClient";
import { ChatRoom } from "../../../component/ChatRoom";
async  function getRoomId(slug:string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room;

}

export default async function Room({params}:{
    params:{
        slug:string,

    }
}) {
    const parsedParams = ( await params);
    const slug = parsedParams.slug;
    console.log(parsedParams);
    const roomId = await getRoomId(slug);
  return (
    <div>
        <ChatRoom id={roomId} ></ChatRoom>
    </div>
 
  )

}
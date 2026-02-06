import WebSocket from "ws";
import { WebSocketServer } from "ws";
import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../config";
export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET_URL);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };
        ws.onmessage = (event) => {
            console.log(event.data);
        };
        return () => {
            ws.close();
        };
    }, []);
    return {
        socket,
        loading,
    };
}
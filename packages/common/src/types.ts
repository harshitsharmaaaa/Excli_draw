import {z} from "zod";

export const createuserSchema = z.object({
    name : z.string(),
    username : z.string().min(3).max(20),
    password : z.string()

})

export const signinSchema = z.object({
    username : z.string().min(3).max(20),
    password : z.string()
})

export const createRoomSchema = z.object({
    roomId : z.number(),
    roomName : z.string()
})
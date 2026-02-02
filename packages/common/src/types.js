"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomSchema = exports.signinSchema = exports.createuserSchema = void 0;
const zod_1 = require("zod");
exports.createuserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string()
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string()
});
exports.createRoomSchema = zod_1.z.object({
    roomId: zod_1.z.number(),
    roomName: zod_1.z.string()
});

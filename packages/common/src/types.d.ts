import { z } from "zod";
export declare const createuserSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createRoomSchema: z.ZodObject<{
    roomId: z.ZodNumber;
    roomName: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=types.d.ts.map
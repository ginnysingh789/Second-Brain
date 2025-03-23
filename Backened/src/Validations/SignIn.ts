import {z} from 'zod';
export const userValidScheme=z.object(
    {
        username:z.string().min(3).max(10),
        password:z.string().min(5).max(15)
    }
)
type userScheme=z.infer<typeof userValidScheme>//For type Safety 
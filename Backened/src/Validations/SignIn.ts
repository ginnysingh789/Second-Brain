import {z} from 'zod';
export const userValidScheme=z.object(
    {
        username:z.string().min(3),
        password:z.string().min(5)
    }
)
type userScheme=z.infer<typeof userValidScheme>//For type Safety 
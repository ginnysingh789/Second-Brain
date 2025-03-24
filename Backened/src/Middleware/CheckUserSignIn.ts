import { UserModel } from "../db/UserScheme"
import bcrypt from 'bcrypt';

export const CheckUserSignIn = async (username: string, password: string): Promise<boolean> => {
    const user = await UserModel.findOne({ username });
    if (!user) {
        return false;
    }
    if (await bcrypt.compare(password, user.password)) {
        return true;
    }
    return false;
}
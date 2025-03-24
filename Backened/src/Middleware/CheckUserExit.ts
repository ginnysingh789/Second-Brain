import { UserModel } from "../db/UserScheme"

export const CheckUserExit = async (username: string): Promise<boolean> => {
    //After getting the username check database it is Exist
    if (await UserModel.findOne({ username })) {
        return true;
    }
    return false;
}
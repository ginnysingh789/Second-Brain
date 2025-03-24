import { UserModel } from "../db/UserScheme"

     export const  CheckUserExit= async(username:string) :Promise<boolean>=>{
            //After getting the username check database it is Exist
            console.log("Received Username from user"+username)
            if(await UserModel.findOne({username}))
            {
                return true;
            }
            return false;

     }
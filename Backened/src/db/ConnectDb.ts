import mongoose from "mongoose";
import dotenv from "dotenv";
//Load Dotenv Config
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)//why we need to ! here is because it ensure typeSafety
            .then(() => {
                console.log("DataBase is Connected ");
            })
    } catch (error) {
        console.log('DataBase is not Connected')

    }
}
export default connect;
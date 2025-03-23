import express,{Request,Response} from "express";// Modern syntax to import the types for the typescript
import { userValidScheme } from "./Validations/SignIn";
import { UserModel } from "./db/UserScheme";
import bcrypt from 'bcrypt';


const app = express();
app.use(express.json());
//End points 

//sign up EndPoint
app.post('/api/v1/signup',async (req:Request, res:Response) => {
    //Zod Valiation 
    const validSignIn = userValidScheme.safeParse(req.body);
    if (!validSignIn.success) {
        return res.status(411).json({ msg: 'Error in inputs' })
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(validSignIn.data.password, 10)

    //Push the data in the database
    try {
        await UserModel.create(
            {
                username: validSignIn.data.username,
                password: hashedPassword
            })
        return res.status(200).json({ msg: 'signed up' })
    } catch (error) {
        return res.status(500).json({ msg: 'server error' + error })
    }
})
//Sign in EndPoint 
app.post('/api/v1/signin', (req, res) => {

})

//Add Content EndPoint 

app.post('/api/v1/content', (req, res) => {

})

//  Get Content EndPoint 
app.get('/api/v1/content', (req, res) => {

})

//Delete Content EndPoint 
app.delete('/api/v1/content', (req, res) => {

})

//Share Content EndPoint 
app.post('/api/v1/brain/share', (req, res) => {

})

//Fetch other Content End Point 
app.get('/api/v1/brain/:shareLink', (req, res) => {

})
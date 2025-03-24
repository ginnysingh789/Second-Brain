import express, { Request, Response } from 'express';
import { userValidScheme } from './Validations/SignIn';
import { UserModel } from "./db/UserScheme";
import bcrypt from 'bcrypt';
import { CheckUserExit } from './Middleware/CheckUserExit';
import connect from './db/ConnectDb';
import dotenv from 'dotenv';
import { CheckUserSignIn } from './Middleware/CheckUserSignIn';
import jwt from 'jsonwebtoken';


dotenv.config();
const Secret_key: string | undefined = process.env.SECERT_KEY;
const app = express();
app.use(express.json());
//End points 
//sign up EndPoint
async function startServer() {
    await connect(); // Calling the connect function\\
}
app.post('/api/v1/signup', async (req: Request, res: Response): Promise<any> => {
    //Zod Valiation 
    const validSignIn = userValidScheme.safeParse(req.body);

    if (!validSignIn.success) {
        console.log('Validation failed:', validSignIn.error);
        return res.status(411).json({ msg: 'Error in inputs' })
    }

    //CHeck user Already Exist or not 
    if ((await CheckUserExit(validSignIn.data.username))) {
        return res.status(403).json({ msg: 'User alreaddy Exist ' })
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
app.post('/api/v1/signin', async (req: Request, res: Response): Promise<any> => {
   try {
    const recivedSignInData = userValidScheme.safeParse(req.body);
    if (!recivedSignInData.success) {
        console.log('Validation failed:', recivedSignInData.error);
        return res.status(411).json({ msg: 'Error in inputs' })
    }
    if (!(await CheckUserSignIn(recivedSignInData.data.username, recivedSignInData.data.password))) {
        return res.status(403).json({ msg: 'Invalid Creditenial ' });
    }
    //Generate Token 
    if (Secret_key) {
        const token = jwt.sign(recivedSignInData.data.username, Secret_key)
        return res.status(200).json({ token })
    }
    
   } catch (error) {
    res.status(500).json({msg:'Interval sever erro'+error})
    
   }
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
app.listen(5000, () => { console.log('Server  is Running') })
startServer();
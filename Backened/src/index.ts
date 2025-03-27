import express, { Request, Response } from 'express';
import { userValidScheme } from './Validations/SignIn';
import { UserModel } from "./db/UserScheme";
import bcrypt from 'bcrypt';
import { CheckUserExit } from './Middleware/CheckUserExit';
import connect from './db/ConnectDb';
import dotenv from 'dotenv';
import { CheckUserSignIn } from './Middleware/CheckUserSignIn';
import jwt from 'jsonwebtoken';
import { CheckToken } from './Middleware/CheckToken';
import { ContentModel } from './db/ContentScheme';


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
            const user = await UserModel.findOne({ username: recivedSignInData.data.username });
            const token = jwt.sign(
                { id: user?._id, username: recivedSignInData.data.username },
                Secret_key,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ token })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Interval sever error' + error })
    }
})
//Add Content EndPoint 
//First create AuthMiddleware check the token users Send
app.post('/api/v1/content', CheckToken, async (req:Request, res:Response) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    try {
        await ContentModel.create(
            {
                title: title,
                link: link,
                type: type,
                //@ts-ignore
                userId: req.userId,
                tags: []
            })
        res.status(200).json({ msg: 'Content Added' })
    } catch (error) {
        res.json({ msg: 'Error ' + error })

    }
})
//  Get Content EndPoint 
app.get('/api/v1/content', CheckToken, async (req:Request, res:Response) => {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await ContentModel.find({ userId }).populate("userId","username");//populate used it show the username of the user
        res.json({ content });
    } catch (error) {
        res.json({ error })
    }
})
//Delete Content EndPoint 
app.delete('/api/v1/content',CheckToken, async(req:Request, res:Response):Promise<any> => {
    const deleteContent=req.body.id;;
    //@ts-ignore
    const userId = req.userId;
    //Done at later 
    if(! await(ContentModel.findOne({userId:userId})))
    {
       return  res.status(403).json({msg:'You dont own this doc'})
    }
    try {
        await ContentModel.deleteMany({_id:deleteContent,userId:userId});
        res.json({msg:'Deleted succeeded'})
        
    } catch (error) {
        res.status(411).json({msg:error});
    }
})

//Share Content EndPoint 
app.post('/api/v1/brain/share', (req, res) => {

})

//Fetch other Content End Point 
app.get('/api/v1/brain/:shareLink', (req, res) => {

})
app.listen(5000, () => { console.log('Server  is Running') })
startServer();
import express, { Request, Response } from 'express';
import { userValidScheme } from './Validations/SignIn';
import { UserModel } from "./db/UserScheme";
import bcrypt, { hash } from 'bcrypt';
import { CheckUserExit } from './Middleware/CheckUserExit';
import connect from './db/ConnectDb';
import dotenv from 'dotenv';
import { CheckUserSignIn } from './Middleware/CheckUserSignIn';
import jwt from 'jsonwebtoken';
import { CheckToken } from './Middleware/CheckToken';
import { ContentModel } from './db/ContentScheme';
import { LinkModel } from './db/LinkScheme';
import { generateRandom } from './db/Utils';
import { Model } from 'mongoose';


dotenv.config();
const Secret_key: string | undefined = process.env.SECERT_KEY;
const app = express();
app.use(express.json());
//End points 
//sign up EndPoint
async function startServer() {
    await connect(); // Calling the connect function\\
}
app.post('/api/v1/signup', async (req: Request, res: Response) => {
    //Zod Valiation 
    const validSignIn = userValidScheme.safeParse(req.body);

    if (!validSignIn.success) {
        console.log('Validation failed:', validSignIn.error);
        res.status(411).json({ msg: 'Error in inputs' })
        return;
    }
    //CHeck user Already Exist or not 
    if ((await CheckUserExit(validSignIn.data.username))) {
        res.status(403).json({ msg: 'User alreaddy Exist ' })
        return;
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
        res.status(200).json({ msg: 'signed up' })
        return;
    } catch (error) {
        res.status(500).json({ msg: 'server error' + error })
        return;
    }
})
//Sign in EndPoint 
app.post('/api/v1/signin', async (req: Request, res: Response) => {
    try {
        const recivedSignInData = userValidScheme.safeParse(req.body);
        if (!recivedSignInData.success) {
            console.log('Validation failed:', recivedSignInData.error);
            res.status(411).json({ msg: 'Error in inputs' })
            return;
        }
        if (!(await CheckUserSignIn(recivedSignInData.data.username, recivedSignInData.data.password))) {
            res.status(403).json({ msg: 'Invalid Creditenial ' });
            return;
        }
        //Generate Token 
        if (Secret_key) {
            const user = await UserModel.findOne({ username: recivedSignInData.data.username });
            const token = jwt.sign(
                { id: user?._id, username: recivedSignInData.data.username },
                Secret_key,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token })
            return;
        }

    } catch (error) {
        res.status(500).json({ msg: 'Interval sever error' + error })
        return;
    }
})
//Add Content EndPoint 
//First create AuthMiddleware check the token users Send
app.post('/api/v1/content', CheckToken, async (req: Request, res: Response) => {
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
app.get('/api/v1/content', CheckToken, async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await ContentModel.find({ userId }).populate("userId", "username");//populate used it show the username of the user
        res.json({ content });
    } catch (error) {
        res.json({ error })
    }
})
//Delete Content EndPoint 
app.delete('/api/v1/content', CheckToken, async (req: Request, res: Response) => {
    const deleteContent = req.body.id;;
    //@ts-ignore
    const userId = req.userId;
    //Done at later 
    if (! await (ContentModel.findOne({ userId: userId }))) {
        res.status(403).json({ msg: 'You dont own this doc' })
        return;
    }
    try {
        await ContentModel.deleteMany({ _id: deleteContent, userId: userId });
        res.json({ msg: 'Deleted succeeded' })

    } catch (error) {
        res.status(411).json({ msg: error });
    }
})
//Share Content EndPoint 
app.post('/api/v1/brain/share', CheckToken, async (req: Request, res: Response) => {

    const share = req.body.share;//Taking share as input true or false
    if (share)//If share is true generarte a shareable link
    {
        const hashValue = generateRandom(10)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hashValue
        })
        //@ts-ignore
        res.status(200).json({ msg: hashValue })
    }
    else {
        LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
    }
})
//Fetch other Content End Point 
app.get('/api/v1/brain/:shareLink', async (req: Request, res: Response): Promise<any> => {
    try {
        const hash = req.params.shareLink;
        const link = await LinkModel.findOne({ hash });
        if (!link) {
            return res.status(411).json({ msg: 'Invalid share link' });
        }
        const content = await ContentModel.findOne({ userId: link.userId });
        const user = await UserModel.findOne({ _id: link.userId });

        res.status(200).json({
            username: user?.username,
            content: content,
        });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
});

app.listen(5000, () => { console.log('Server  is Running') })
startServer();
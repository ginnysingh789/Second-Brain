import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const Secret_key: string | undefined = process.env.SECERT_KEY;
export const CheckToken = (req: Request, res: Response, next: NextFunction) => {
    const Headers = req.headers["authorization"];
    try {
        if (Secret_key) {
            const decoded = jwt.verify(Headers as string, Secret_key)
            //@ts-ignore
            req.userId = decoded.id;
            next()
        }
    } catch (error) {
        res.status(403).json({ msg: 'Your are not logged ' + error })

    }



}
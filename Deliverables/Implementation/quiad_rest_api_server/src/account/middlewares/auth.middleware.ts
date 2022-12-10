import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {

    public filter(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if(token) {
            const account = jwt.verify(token, "secret");
            next();
        } else {
            res.status(401).json(null);
        }
    }

}
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {

    public filter(operation: string) {
        return function(req: Request, res: Response, next: NextFunction) {
            const bearer = req.headers.authorization;
            const token = bearer?.split(" ")[1];
            if(token) {
                try {
                    const account: any = jwt.verify(token, "secret");
                    if(account) {
                        const user = account.user;
                        const role = user.role;
                        const operations = role.operations;
                        const isAllowed = operations.find((o: any) => o.name == operation);
                        if(isAllowed) {
                            res.locals.account = account;
                            next();
                        } else {
                            res.status(401).json(null);
                        }
                    } else {
                        res.status(401).json(null);
                    }
                } catch(err) {
                    res.status(401).json(null);
                }
            } else {
                res.status(401).json(null);
            }
        };
    }

}
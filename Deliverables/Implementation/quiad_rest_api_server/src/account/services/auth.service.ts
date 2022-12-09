import { NextFunction, Request, Response } from "express";
import { AccountController } from "../controllers/account.controller";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthService {

    private accountController: AccountController = new AccountController();

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const username = req.body.username;
        try {
            const user = await this.accountController.findByUsername(username);
            if(user) {
                const password = req.body.password;
                if(bcrypt.compareSync(password, user.password!)) {
                    res.json({
                        user: user,
                        token: sign(user, "secret")
                    });
                } else {
                    res.status(401).json(null);
                }
            } else {
                res.status(401).json(null);
            }
        } catch(err) {
            console.log(err);
            res.json(err);
        }
    }

}

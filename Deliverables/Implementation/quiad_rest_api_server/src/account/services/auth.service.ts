import { NextFunction, Request, Response } from "express";
import { AccountController } from "../controllers/account.controller";

export class AuthService {

    private accountController: AccountController = new AccountController();

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const username = req.body.username;
        try {
            const user = await this.accountController.findByUsername(username);
            res.json(user);
        } catch(err) {
            console.log(err);
            res.json(err);
        }
    }

}

import { NextFunction, Request, Response } from "express";
import { AccountController } from "../controllers/account.controller";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthService {

    private accountController: AccountController = new AccountController();

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const username = req.body.username;
        if(username) {                              // PRE: Verifico che lo username esista
            try {
                const account = await this.accountController.findByUsername(username);
                if(account) {
                    const password = req.body.password;
                    if(password) {                  // PRE: Verifico che la password esista
                        if(bcrypt.compareSync(password, account.password!)) {
                            const _ = {
                                ...account,
                                password: undefined // POST: Nascondo la password
                            }
                            res.json({
                                account: {
                                    ..._,
                                    token: sign(_, "secret")
                                },
                            });
                        } else {
                            res.status(401).json(null);
                        }
                    } else {
                        res.status(400).json(null);
                    }
                } else {
                    res.status(401).json(null);
                }
            } catch(err) {
                console.log(err);
                res.json(err);
            }
        } else {
            res.status(400).json(null);
        }
    }

}

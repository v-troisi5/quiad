import { NextFunction, Request, Response } from "express";
import { AccountController } from "../controllers/account.controller";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export class RegistrationService {

    private accountController = new AccountController();

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const _ = req.body.account;
        _.password = bcrypt.hashSync(_.password, 10);       // Generazione dell'hash della password e sostituzione alla vecchia password
        try {
            const account = await this.accountController.createAccount(_);
            res.json(account);
        } catch(err) {
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2002") {
                    if(err.meta?.target == "Account_email_key") {
                        res.status(409).json({
                            message: "L'email è già in utilizzo"
                        });
                    } else if(err.meta?.target == "Account_username_key") {
                        res.status(409).json({
                            message: "Questo username è già in utilizzo"
                        });
                    } else {
                        res.status(500).json(null);
                    }
                }
            } else {
                res.status(500).json(null);
            }
        }
    }

}

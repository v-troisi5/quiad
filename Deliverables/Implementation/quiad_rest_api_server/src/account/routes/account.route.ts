import express, { Express } from "express";
import { AuthService } from "../services/auth.service";


export class AccountRoute {

    private app = express();

    private authService: AuthService = new AuthService();

    constructor() {
        this.app.post("/login", (req, res, next) => {
            return this.authService.login(req, res, next);
        });
    }

    public getApplication(): Express {
        return this.app;
    }

}
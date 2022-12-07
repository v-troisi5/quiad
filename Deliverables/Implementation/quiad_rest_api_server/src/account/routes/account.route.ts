import express, { Express } from "express";
import { Route } from "../../utils/Route";
import { AuthService } from "../services/auth.service";

export class AccountRoute extends Route {

    private authService = new AuthService();

    constructor() {
        super();
        this.app.post("/login", (req, res, next) => {
            return this.authService.login(req, res, next);
        });
    }

}
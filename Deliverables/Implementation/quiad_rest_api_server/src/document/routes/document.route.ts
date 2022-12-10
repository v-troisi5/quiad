import { DocumentService } from "../services/document.service";
import express from "express";

import { Route } from "../../utils/Route";
import { AuthMiddleware } from "../../account/middlewares/auth.middleware";

import { middleware } from 'apicache';

export class DocumentRoute extends Route {

    public readonly app = express();
    private documentService = new DocumentService();

    private authMiddleware = new AuthMiddleware();

    constructor() {
        super();
        this.app.get("/",  this.authMiddleware.filter, middleware("1 hour"), (req, res, next) => {
            this.documentService.findDocuments(req, res, next);
        });
        this.app.post("/", (req, res, next) => {
            this.documentService.createDocument(req, res, next);
        });
    }

}
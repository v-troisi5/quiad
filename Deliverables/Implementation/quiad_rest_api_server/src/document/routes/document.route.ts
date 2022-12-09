import { DocumentService } from "../services/document.service";
import express from "express";

import { Route } from "../../utils/Route";


export class DocumentRoute extends Route {

    public readonly app = express();
    private documentService = new DocumentService();

    constructor() {
        super();
        this.app.get("/", (req, res, next) => {
            this.documentService.findDocuments(req, res, next);
        });
        this.app.post("/", (req, res, next) => {
            this.documentService.createDocument(req, res, next);
        });
        this.app.patch("/:id", (req, res, next) => {
            this.documentService.updateDocument(req, res, next);
        });
    }

}
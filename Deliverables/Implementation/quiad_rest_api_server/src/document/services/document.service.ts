import { DocumentController } from "../controllers/document.controller";
import { NextFunction, Request, Response } from "express";


export class DocumentService {

    private documentController = new DocumentController();

    public async findDocuments(req: Request, res: Response, next: NextFunction): Promise<void> {
        const documents = await this.documentController.findDocuments();
        res.json(documents);
    }

    public async createDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const document = req.body.document;
        const createdDocument = await this.documentController.createDocument(document);
        res.json(createdDocument);
    }

    public async updateDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        const document = req.body.document;
        const updatedDocument = await this.documentController.updateDocument(id, document);
        res.json(updatedDocument);
    }

}
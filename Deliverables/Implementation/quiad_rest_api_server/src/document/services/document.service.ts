import { DocumentController } from "../controllers/document.controller";
import { NextFunction, Request, Response } from "express";
import { DocumentFilter } from "../utils/document.filter";


export class DocumentService {

    private documentController = new DocumentController();

    public async findDocuments(req: Request, res: Response, next: NextFunction): Promise<void> {
        const filter = new DocumentFilter(req.query);
        const documents = await this.documentController.findDocuments(filter);
        res.json(documents);
    }

    public async createDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const document = req.body.document;
        const createdDocument = await this.documentController.createDocument(document);
        res.json(createdDocument);
    }

    public async getDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const result = await this.documentController.getDocument(id);
            res.setHeader('Content-Length', result.stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            result.file.pipe(res);
        } catch(err) {
            res.status(404).send()
        }
    }

}

import { Document } from "@prisma/client";
import { prisma } from "../../utils/clients";
import { DocumentFilter } from "../utils/document.filter";
import fs from "fs";
import path from "path"

export class DocumentController {

    private prisma = prisma

    public async findDocuments(filter: DocumentFilter): Promise<Document[]> {
        const documents = await this.prisma.document.findMany({
            where: {
                retrievalDate: {
                    gte: filter.retrievalDate
                },
                originDate: {
                    gte: filter.originDate
                },
                retrievalPlace: filter.retrievalPlace,
                originPlace: filter.originPlace,
                categoryId: filter.categoryId
            },

        });
        return documents as Document[];
    }

    public async createDocument(document: any): Promise<Document> {
        const createdDocument = await this.prisma.document.create({
            data: document
        });
        return createdDocument;
    }

    public async getDocument(id: number) {
        const document = await this.prisma.document.findUnique({
            where: {
                id: id
            },
            select: {
                path: true
            }
        });
        if(document) {
            var file = fs.createReadStream(path.join('./documents', document?.path!));
            var stat = fs.statSync(path.join('./documents', 'output.pdf'));
            return {file, stat};
        } else {
            throw new Error("Cannot find this document");
        }
    }

}
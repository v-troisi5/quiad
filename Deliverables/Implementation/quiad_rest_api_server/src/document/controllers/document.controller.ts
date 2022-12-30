import { Document } from "@prisma/client";
import { prisma } from "../../utils/clients";
import { DocumentFilter } from "../utils/document.filter";

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

}
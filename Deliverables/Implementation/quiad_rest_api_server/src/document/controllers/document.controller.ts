import { Document, PrismaClient } from "@prisma/client";
import { DocumentFilter } from "../utils/document.filter";

export class DocumentController {

    private prisma = new PrismaClient();

    public async findDocuments(filter: DocumentFilter): Promise<Document[]> {
        const documents = await this.prisma.document.findMany({
            where: {
                retrievalDate: filter.retrievalDate,
                retrievalPlace: filter.retrievalPlace,
                originDate: filter.originDate,
                originPlace: filter.originPlace,
            }
        });
        return documents as Document[];
    }

    public async createDocument(document: Document): Promise<Document> {
        const createdDocument = await this.prisma.document.create({
            data: document
        });
        return createdDocument;
    }

    // TODO: Aggiungere approvazione documento

}
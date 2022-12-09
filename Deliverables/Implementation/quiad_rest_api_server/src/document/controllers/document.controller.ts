import { Document, PrismaClient } from "@prisma/client";

export class DocumentController {

    private prisma = new PrismaClient();

    public async findDocuments(): Promise<Document[]> {
        const documents = await this.prisma.document.findMany({
            // TODO: usare i filtri specificati
        });
        return documents as Document[];
    }

    public async createDocument(document: Document): Promise<Document> {
        const createdDocument = await this.prisma.document.create({
            data: document
        });
        return createdDocument;
    }

    public async updateDocument(id: number, document: Document): Promise<Document> {
        const updateDocument = await this.prisma.document.update({
            where: {
                id: id
            },
            data: document
        });
        return updateDocument;
    }

    // TODO: Aggiungere approvazione documento

}
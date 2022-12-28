
import { prismaMock } from '../../utils/singleton'
import { DocumentController } from './document.controller';

describe("Document Controller", () => {
    
    const documentController = new DocumentController();
    
    it("Should find a list of existing documents", () => {
        prismaMock.document.findMany.mockResolvedValue([
            {
                id: 1,
                nome: "Registro delle nascite",
                originDate: new Date("2022-01-01"),
                retrievalDate: new Date("2022-01-01"),
                retrievalPlace: "Salerno",
                originPlace: "Salerno",
                path: "/",
                categoryId: 1
            }
        ]);
        return documentController
            .findDocuments({
                originPlace: "Salerno"
            }).then(documents => {
                expect(documents).toBeDefined();
            });
    });
    
    it("Should create a document", () => {
        prismaMock.document.create.mockResolvedValue({
            id: 1,
            nome: "Registro delle nascite",
            originDate: new Date("2022-01-01"),
            retrievalDate: new Date("2022-01-01"),
            retrievalPlace: "Salerno",
            originPlace: "Salerno",
            path: "/",
            categoryId: 1
        });
        return documentController
            .createDocument({
                nome: "Registro delle nascite",
                originDate: new Date("2022-01-01"),
                retrievalDate: new Date("2022-01-01"),
                retrievalPlace: "Salerno",
                originPlace: "Salerno",
                path: "/"
            }).then(document => {
                expect(document).toBeDefined();
            });
    });

});

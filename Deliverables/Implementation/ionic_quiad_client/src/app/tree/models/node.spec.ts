import { Document } from "src/app/document/models/document";
import { Node } from "src/app/tree/models/node";

describe('Node', () => {
    let node: Node;
    let document: Document;

    beforeEach(() => {
        node = new Node({
            id: 1,
            firstname: "Pasquale",
            lastname: "Cafiero",
            birthdate: new Date("1953-11-09").toString(),
            birthplace: "Poggioreale",
            sex: "MALE"
        });
        document = new Document({
            id: 1,
            categoryId: 1,
            name: "Registro delle nascite",
            originDate: new Date("1990-12-09").toString(),
            retrievalDate: new Date("2019-12-09").toString(),
            originPlace: "Battipaglia",
            retrievalPlace: "Salerno"
        });
    });

    it("Should be created", () => {
        expect(node).toBeDefined();
    });

    it("Should bind a document to a node", () => {
        node.bindDocument(document);
        expect(node.documents.has(document)).toBeTrue();
    });

    it("Should bind a document to a node", () => {
        node.bindDocument(document);
        expect(node.documents.has(document)).toBeTrue();
        node.unbindDocument(document.id);
        expect(node.documents.has(document)).toBeFalse();
    });

});
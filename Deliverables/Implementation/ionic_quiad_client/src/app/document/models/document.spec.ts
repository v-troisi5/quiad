import { Document } from "./document";

describe('Document', () => {
    let document: Document;

    beforeEach(() => {
        document = new Document({
            id: 1,
            name: "Registro delle nascite",
            categoryId: 1,
            originDate: new Date("1900-01-12").toString(),
            retrievalDate: new Date("2022-01-12").toString(),
            originPlace: "Salerno",
            retrievalPlace: "Salerno"
        });
    });

    it("Should be created", () => {
        expect(document).toBeDefined();
    });

    it("Should contain valid Date objects for originDate and retrievalDate", () => {
        expect(document.originDate).toEqual(new Date("1900-01-12"));
        expect(document.retrievalDate).toEqual(new Date("2022-01-12"));
    });

});
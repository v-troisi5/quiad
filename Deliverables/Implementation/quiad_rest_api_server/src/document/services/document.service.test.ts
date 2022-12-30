import { Document } from "document/models/Document";
import { NextFunction, Request, Response } from "express";
import { prismaMock } from "../../utils/singleton";
import { DocumentService } from "./document.service";

describe("Document Service", () => {

    const documentService = new DocumentService();

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            body: {}
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn((code: number) => mockResponse as Response)
        };
    });

    it("It should find a list of document", () => {
        prismaMock.document.findMany.mockResolvedValue([
            {
                id: 1,
                name: "Registro delle nascite",
                originDate: new Date("2022-01-01"),
                retrievalDate: new Date("2022-01-01"),
                retrievalPlace: "Salerno",
                originPlace: "Salerno",
                path: "/",
                categoryId: 1
            }
        ]);
        mockRequest.body.originPlace = "Salerno";
        return documentService
            .findDocuments(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toHaveBeenLastCalledWith([
                    {
                        id: 1,
                        nome: "Registro delle nascite",
                        originDate: new Date("2022-01-01"),
                        retrievalDate: new Date("2022-01-01"),
                        retrievalPlace: "Salerno",
                        categoryId: 1,
                        originPlace: "Salerno",
                        path: "/"
                    }
                ]);
            });
    });

    it("It should create a document", () => {
        prismaMock.document.create.mockResolvedValue({
            id: 1,
            name: "Registro delle nascite",
            originDate: new Date("2022-01-01"),
            retrievalDate: new Date("2022-01-01"),
            retrievalPlace: "Salerno",
            originPlace: "Salerno",
            path: "/",
            categoryId: 1
        });
        return documentService
            .createDocument(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 1,
                    nome: "Registro delle nascite",
                    originDate: new Date("2022-01-01"),
                    retrievalDate: new Date("2022-01-01"),
                    retrievalPlace: "Salerno",
                    originPlace: "Salerno",
                    path: "/",
                    categoryId: 1
                });
            });
    });

});

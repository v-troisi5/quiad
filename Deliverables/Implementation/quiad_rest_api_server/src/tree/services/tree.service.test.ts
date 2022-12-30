import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prismaMock } from "../../utils/singleton";
import { TreeService } from "./tree.service";

describe("Tree Service", () => {

    const treeService = new TreeService();

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            body: {},
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn((code: number) => mockResponse as Response),
            locals: {

            }
        };
    });

    it("Should find a list of nodes filtered by owner", () => {
        prismaMock.node.findMany.mockResolvedValue([
            {
                id: 2,
                firstname: "Mario",
                lastname: "Rossi",
                birthdate: new Date("1990-02-01"),
                birthplace: "Salerno",
                ownerId: 1,
                sex: "MALE",
                deathdate: null,
                deathplace: null,
                motherId: null,
                fatherId: null
            }
        ]);
        mockRequest.params = {
            owner: "1"
        }
        mockResponse.locals!.account = {
            id: 1,
            user: {
                id: 1
            }
        }
        return treeService
            .getNodes(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith([
                    {
                        id: 2,
                        firstname: "Mario",
                        lastname: "Rossi",
                        birthdate: new Date("1990-02-01"),
                        birthplace: "Salerno",
                        ownerId: 1,
                        sex: "MALE",
                        deathdate: null,
                        deathplace: null,
                        motherId: null,
                        fatherId: null
                    }
                ]);
            });
    });

    it("Should not find a list of nodes beloging to another account", () => {
        mockRequest.params = {
            owner: "2"
        }
        mockResponse.locals!.account = {
            id: 1,
            user: {
                id: 1
            }
        }
        return treeService
            .getNodes(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith(null);
                expect(mockResponse.status).toBeCalledWith(403);
            });
    });

    it("Should create a node", () => {
        prismaMock.node.create.mockResolvedValue({
            id: 2,
            firstname: "Mario",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Salerno",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        });
        mockRequest.body.node = {
            id: 2,
            firstname: "Mario",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Salerno",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        }
        return treeService
            .createNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 2,
                    firstname: "Mario",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Salerno",
                    ownerId: 1,
                    sex: "MALE",
                    deathdate: null,
                    deathplace: null,
                    motherId: null,
                    fatherId: null
                });
            });
    });

    it("Should handle any unknown error during creation", () => {
        prismaMock.node.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("Test Error", { clientVersion: "" }));
        mockRequest.body.node = {
            id: 2,
            firstname: "Mario",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Salerno",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        }
        return treeService
            .createNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toHaveBeenCalledWith(500);
                expect(mockResponse.json).toHaveBeenCalledWith(null);
            });
    });

    it("Should update a node", () => {
        prismaMock.node.update.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Salerno",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        });
        mockRequest.params = {
            id: "2"
        }
        mockRequest.body.node = {
            firstname: "Luigi",
        }
        return treeService
            .updateNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 2,
                    firstname: "Luigi",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Salerno",
                    ownerId: 1,
                    sex: "MALE",
                    deathdate: null,
                    deathplace: null,
                    motherId: null,
                    fatherId: null
                });
            });
    });

    it("Should delete a node", () => {
        prismaMock.node.delete.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Salerno",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        });
        mockRequest.params = {
            id: "2"
        };
        mockResponse.locals!.account = {
            id: 1,
            user: {
                id: 1,
                node: {
                    id: 1
                }
            }
        }
        return treeService
            .deleteNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 2,
                    firstname: "Luigi",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Salerno",
                    ownerId: 1,
                    sex: "MALE",
                    deathdate: null,
                    deathplace: null,
                    motherId: null,
                    fatherId: null
                });
            });
    });

    it("Should not delete a node that doesn't exist", () => {
        prismaMock.node.delete.mockRejectedValue(null)
        mockRequest.params = {
            id: "2"
        };
        mockResponse.locals!.account = {
            id: 1,
            user: {
                id: 1,
                node: {
                    id: 1
                }
            }
        }
        return treeService
            .deleteNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toBeCalledWith(500);
                expect(mockResponse.json).toBeCalledWith(null);
            });
    });

    it("Should not delete the user node", () => {
        mockRequest.params = {
            id: "1"
        };
        mockResponse.locals!.account = {
            id: 1,
            user: {
                id: 1,
                node: {
                    id: 1
                }
            }
        }
        return treeService
            .deleteNode(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith(null);
                expect(mockResponse.status).toBeCalledWith(500);
            });
    });

    it("Should bind a document to a node", () => {
        prismaMock.node.update.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Giffoni",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null,
            documents: [
                {
                    id: 3
                },
                {
                    id: 4
                }
            ]
        } as any);
        mockRequest.params = {
            node: "2",
            document: "3"
        };
        return treeService
            .bindDocument(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 2,
                    firstname: "Luigi",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Giffoni",
                    ownerId: 1,
                    sex: "MALE",
                    deathdate: null,
                    deathplace: null,
                    motherId: null,
                    fatherId: null,
                    documents: [
                        {
                            id: 3
                        },
                        {
                            id: 4
                        }
                    ]
                });
            });
    });

    it("Should not perform bind if either the node or the document doesn't exist", () => {
        prismaMock.node.update.mockRejectedValue(null);
        mockRequest.params = {
            node: "2",
            document: "3"
        };
        return treeService
            .bindDocument(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toBeCalledWith(500);
                expect(mockResponse.json).toBeCalledWith(null);
            });
    });

    it("Should not perform unbind if either the node or the document doesn't exist", () => {
        prismaMock.node.update.mockRejectedValue(null);
        mockRequest.params = {
            node: "2",
            document: "3"
        };
        return treeService
            .unbindDocument(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toBeCalledWith(500);
                expect(mockResponse.json).toBeCalledWith(null);
            });
    });

    it("Should unbind a document from a node", () => {
        prismaMock.document.findUnique.mockResolvedValue({
            id: 2
        } as any);
        prismaMock.node.update.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Giffoni",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null,
            documents: [
                {
                    id: 4
                }
            ]
        } as any);
        mockRequest.params = {
            node: "2",
            document: "3"
        };
        return treeService
            .unbindDocument(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 2,
                    firstname: "Luigi",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Giffoni",
                    ownerId: 1,
                    sex: "MALE",
                    deathdate: null,
                    deathplace: null,
                    motherId: null,
                    fatherId: null,
                    documents: [
                        {
                            id: 4
                        }
                    ]
                });
            });
    });

});
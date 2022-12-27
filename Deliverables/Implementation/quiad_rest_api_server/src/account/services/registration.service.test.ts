import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prismaMock } from "../../utils/singleton";
import { RegistrationService } from "./registration.service";

describe("Registration Service", () => {

    const registrationService = new RegistrationService();

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

    it("Should register an account", () => {
        prismaMock.account.create.mockResolvedValue({
            id: 1,
            email: "valeriotroisi@quiad.com",
            username: "quiad",
            user: {
                residence: "Via Delle Palme, 17",
                node: {
                    firstname: "Valerio",
                    lastname: "Troisi"
                }
            }
        } as any);
        mockRequest.body.account = {
            email: "valeriotroisi@quiad.com",
            username: "quiad",
            password: "miapassword",
            user: {
                residence: "Via Delle Palme, 17",
                node: {
                    firstname: "Valerio",
                    lastname: "Troisi"
                }
            }
        }
        return registrationService
            .register(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    id: 1,
                    email: "valeriotroisi@quiad.com",
                    username: "quiad",
                    user: {
                        residence: "Via Delle Palme, 17",
                        node: {
                            firstname: "Valerio",
                            lastname: "Troisi"
                        }
                    }
                });
            });
    });

    it("Should register an account", () => {
        prismaMock.account.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("There is a unique constraint violation", { code: "", clientVersion: "" }));
        mockRequest.body.account = {
            email: "valeriotroisi@quiad.com",
            username: "quiad",
            password: "miapassword",
            user: {
                residence: "Via Delle Palme, 17",
                node: {
                    firstname: "Valerio",
                    lastname: "Troisi"
                }
            }
        }
        return registrationService
            .register(mockRequest as Request, mockResponse as Response, nextFunction)
            .catch(err => {
                expect(mockResponse.status).toHaveBeenLastCalledWith(500);
                expect(err).toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
            })
    });

});
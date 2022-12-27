import { NextFunction, Request, Response } from "express";
import { anyString } from "jest-mock-extended";
import { prismaMock } from "../../utils/singleton";
import { AuthService } from "./auth.service";

const authService = new AuthService();

describe("Authorization Service", () => {

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

    it("Should authenticate a valid account", () => {
        prismaMock.account.findUnique.mockResolvedValue({
            id: 1,
            email: "test@quiad.net",
            username: "quiad",
            password: "$2b$10$zlmPcYWRUYTF8PZw9MDib.Nx7r14Mx/YSkcFucyZwMtgBtA8AAMbK"
        });
        mockRequest.body.username = "quiad";
        mockRequest.body.password = "miapassword";
        return authService
            .login(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.json).toBeCalledWith({
                    account: {
                        id: 1,
                        username: "quiad",
                        email: "test@quiad.net",
                        password: undefined,
                        token: anyString()
                    }
                });
            });
    });

    it("Should authenticate an account with non valid password", () => {
        prismaMock.account.findUnique.mockResolvedValue({
            id: 1,
            email: "test@quiad.net",
            username: "quiad",
            password: "$2b$10$zlmPcYWRUYTF8PZw9MDib.Nx7r14Mx/YSkcFucyZwMtgBtA8AAMbK"
        });
        mockRequest.body.username = "quiad";
        mockRequest.body.password = "miapasswordz";
        return authService
            .login(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toBeCalledWith(401);
                expect(mockResponse.json).toBeCalledWith(null);
            });
    });

    it("Should authenticate an account with non valid username", () => {
        mockRequest.body.username = "daqh";
        mockRequest.body.password = "miapassword";
        return authService
            .login(mockRequest as Request, mockResponse as Response, nextFunction)
            .then(() => {
                expect(mockResponse.status).toBeCalledWith(401);
                expect(mockResponse.json).toBeCalledWith(null);
            });
    });

});

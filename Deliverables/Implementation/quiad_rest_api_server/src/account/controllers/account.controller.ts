import { PrismaClient } from "@prisma/client";
import { Account } from "../models/account";
import { Role } from "../models/role";
import { User } from "../models/user";


export class AccountController {

    private prisma: PrismaClient = new PrismaClient();

    public async findByUsername(username: string): Promise<Account> {
        return new Promise(async (resolve, reject) => {
            try {
                const account = await this.prisma.account.findUnique({
                    where: {
                        username: username,
                    },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        password: false,
                        user: {
                            select: {
                                id: true,
                                residence: true,
                                role: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                nodeId: true,
                                curator: true
                            }
                        },
                        supervisor: true,
                    }
                });
                resolve(account as Account);
            } catch(err) {
                reject(err);
            }
        });
    }

}
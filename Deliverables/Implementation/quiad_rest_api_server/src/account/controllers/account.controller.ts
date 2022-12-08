import { PrismaClient } from "@prisma/client";
import { Account } from "../models/account";


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
                        password: true,
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
                                node: {
                                    select: {
                                        id: true,
                                        firstname: true,
                                        lastname: true,
                                        birthdate: true,
                                        birthplace: true,
                                        sex: true
                                    }
                                },
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

    public async createAccount(account: any): Promise<Account> {
        const result = await this.prisma.account.create({
            data: {
                username: account.username,
                email: account.email,
                password: account.password,
                user: {
                    create: {
                        residence: account.user.residence,
                        role: {
                            connect: {
                                name: "standard"
                            }
                        },
                        node: {
                            create: {
                                firstname: account.node.firstname,
                                lastname: account.node.lastname,
                                birthdate: account.node.birthdate,
                                birthplace: account.node.birthplace,
                                sex: account.node.sex
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                email: true,
                username: true,
                user: {
                    select: {
                        id: true,
                        role: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        node: {
                            select: {
                                id: true,
                                firstname: true,
                                lastname: true,
                                birthdate: true,
                                birthplace: true,
                                sex: true
                            }
                        }
                    }
                },
            }
        });
        return result;
    }

}
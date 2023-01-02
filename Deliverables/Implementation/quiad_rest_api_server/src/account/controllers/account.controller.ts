import { PrismaClient } from "@prisma/client";
import { Account } from "../models/account";

import { prisma } from "../../utils/clients";

export class AccountController {

    private prisma: PrismaClient = prisma;

    public async findByUsername(username: string): Promise<Account> {
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
                                name: true,
                                operations: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        },
                        node: {
                            select: {
                                id: true,
                                firstname: true,
                                lastname: true,
                                birthdate: true,
                                birthplace: true,
                                sex: true,
                                fatherId: true,
                                motherId: true,
                                father: {
                                    select: {
                                        id: true,
                                        firstname: true,
                                        lastname: true
                                    }
                                },
                                mother: {
                                    select: {
                                        id: true,
                                        firstname: true,
                                        lastname: true
                                    }
                                },
                            }
                        },
                        curator: true
                    }
                },
                supervisor: true,
            }
        });
        return account as Account;
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
                                firstname: account.user.node.firstname,
                                lastname: account.user.node.lastname,
                                birthdate: account.user.node.birthdate ? new Date(account.user.node.birthdate) : null,
                                birthplace: account.user.node.birthplace,
                                sex: account.user.node.sex
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
        return result as Account;
    }

}
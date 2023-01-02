import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../utils/clients";
import { Node } from "../models/Node";

export class NodeController {

    private prisma: PrismaClient = prisma

    public async getNodes(owner: number): Promise<Node[]> {
        const nodes = await this.prisma.node.findMany({
            where: {
                ownerId: owner
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                birthdate: true,
                birthplace: true,
                deathdate: true,
                deathplace: true,
                documents: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                fatherId: true,
                father: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                    }
                },
                motherId: true,
                mother: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                    }    
                },
                ownerId: true,
                sex: true
            }
        });
        return nodes as Node[];
    }

    public async createNode(node: Node): Promise<Node> {
        const createdNode = await this.prisma.node.create({
            data: node as any,
            select: {
                id: true,
                birthdate: true,
                firstname: true,
                lastname: true,
                birthplace: true,
                deathdate: true,
                fatherId: true,
                motherId: true,
                deathplace: true,
                ownerId: true,
                sex: true,
                documents: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                father: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                    }
                },
                mother: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                    }    
                },
            }
        });
        return createdNode as Node;
    }

    public async updateNode(id: number, node: Node): Promise<Node> {
        const updatedNode = await this.prisma.node.update({
            data: node as any,
            where: {
                id: id
            },
            select: {
                id: true,
                birthdate: true,
                firstname: true,
                lastname: true,
                birthplace: true,
                deathdate: true,
                fatherId: true,
                motherId: true,
                deathplace: true,
                ownerId: true,
                sex: true,
                documents: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return updatedNode as Node;
    }

    public async deleteNode(id: number): Promise<Node> {
        const node = await this.prisma.node.delete({
            where: {
                id: id,
            }
        });
        return node as Node;
    }

    public async bindDocument(node: number, document: number): Promise<Node> {
        const bindedNode = await this.prisma.node.update({
            where: {
                id: node
            },
            data: {
                documents: {
                    connect: {
                        id: document
                    }
                }
            },
            select: {
                id: true,
                birthdate: true,
                firstname: true,
                lastname: true,
                birthplace: true,
                deathdate: true,
                fatherId: true,
                motherId: true,
                deathplace: true,
                ownerId: true,
                sex: true,
                documents: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return bindedNode as Node;
    }

    public async unbindDocument(node: number, document: number): Promise<Node> {
        const documentToUnbind = await this.prisma.document.findUnique({
            where: {
                id: document
            }
        });
        if(!documentToUnbind) throw new Error("The document doesn't exist");
        const unbindedNode = await this.prisma.node.update({
            where: {
                id: node
            },
            data: {
                documents: {
                    disconnect: {
                        id: document
                    }
                }
            },
            select: {
                id: true,
                birthdate: true,
                firstname: true,
                lastname: true,
                birthplace: true,
                deathdate: true,
                fatherId: true,
                motherId: true,
                deathplace: true,
                ownerId: true,
                sex: true,
                documents: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return unbindedNode as Node;
    }

}

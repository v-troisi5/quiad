import { PrismaClient } from "@prisma/client";
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
                    }
                },
                fatherId: true,
                motherId: true,
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
                firstname: true,
                lastname: true,
                sex: true,
                fatherId: true,
                motherId: true,
                deathdate: true,
                deathplace: true,
                birthdate: true,
                birthplace: true,
                ownerId: true,
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
                firstname: true,
                lastname: true,
                sex: true,
                fatherId: true,
                motherId: true,
                deathdate: true,
                deathplace: true,
                birthdate: true,
                birthplace: true,
                ownerId: true
            }
        });
        return updatedNode as Node;
    }

    public async deleteNode(id: number): Promise<Node> {
        const node = await this.prisma.node.findUnique({
            where: {
                id: id
            }
        });
        const { count } = await this.prisma.node.deleteMany({
            where: {
                id: id,
                user: {
                    id: {
                        not: id
                    }
                }
            }
        });
        console.log(node)
        if(node && count == 0) {
            throw new Error("Can't delete this node");
        }
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
            }
        });
        return bindedNode as Node;
    }

    public async unbindDocument(node: number, document: number): Promise<Node> {
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
            }
        });
        return unbindedNode as Node;
    }

}

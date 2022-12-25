import { PrismaClient } from "@prisma/client";
import { Node } from "../models/Node";

export class NodeController {

    private prisma: PrismaClient = new PrismaClient();

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
            data: node,
            select: {
                id: true,
                firstname: true,
                lastname: true,
                sex: true
            }
        });
        return createdNode as Node;
    }

    public async updateNode(id: number, node: Node): Promise<Node> {
        const updatedNode = await this.prisma.node.update({
            data: node,
            where: {
                id: id
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                sex: true
            }
        });
        return updatedNode as Node;
    }

    public async deleteNode(id: number): Promise<Node> {
        const deletedNode = await this.prisma.node.delete({
            where: {
                id: id
            }
        });
        return deletedNode as Node;
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

import { PrismaClient } from "@prisma/client";
import { Node } from "../models/Node";

export class NodeController {

    private prisma: PrismaClient = new PrismaClient();

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

}

import { Prisma, PrismaClient } from "@prisma/client";
import { bfs } from "../../utils/bfs";
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

    public async deleteNode(id: number): Promise<number[]> {
        const node = await this.prisma.node.findUnique({
            where: {
                id: id
            },
        });
        if(node?.ownerId) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: node.ownerId
                },
                select: {
                    node: {
                        select: {
                            id: true,
                            firstname: true,
                            lastname: true,
                            fatherId: true,
                            motherId: true,
                            motherHasChildren: {
                                select: {
                                    id: true,
                                    fatherId: true,
                                    motherId: true,
                                }
                            },
                            fatherHasChildren: {
                                select: {
                                    id: true,
                                    fatherId: true,
                                    motherId: true,
                                }
                            },
                        }
                    }
                }
            });
            const tree = await this.prisma.node.findMany({
                where: {
                    ownerId: node?.ownerId,
                    AND: {
                        id: {
                            not: id
                        }
                    }
                },
                select: {
                    id: true,
                    fatherId: true,
                    motherId: true,
                    motherHasChildren: {
                        select: {
                            id: true,
                            fatherId: true,
                            motherId: true,
                        }
                    },
                    fatherHasChildren: {
                        select: {
                            id: true,
                            fatherId: true,
                            motherId: true,
                        }
                    },
                }
            });
            const cc = bfs(user?.node as any, tree as any);
            const nodesToDelete = tree.filter(n => !cc.find(_ => _ == n as any)).map(n => n.id); // Restituisce la lista dei nodi da eliminare per mantenere una corretta struttura dell'albero genealogico
            nodesToDelete.push(id);
            await this.prisma.node.deleteMany({
                where: {
                    id: {
                        in: nodesToDelete
                    }
                },
            });
            return nodesToDelete as any;
        } else {
            throw new Error();
        }
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
